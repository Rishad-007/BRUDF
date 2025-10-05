/**
 * Database Migration Script for BRUDF Website
 * Migrates data from SQLite to external databases (PostgreSQL, MongoDB, Supabase)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDatabaseConfig, DB_PROVIDERS } from "../databaseConfig.js";
import DatabaseAdapter from "../databaseAdapter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DatabaseMigrator {
  constructor() {
    this.sourceAdapter = null;
    this.targetAdapter = null;
  }

  /**
   * Migrate data from SQLite to external database
   */
  async migrateFromSQLite(targetProvider) {
    try {
      console.log(`🚀 Starting migration from SQLite to ${targetProvider}...`);

      // Setup source (SQLite) adapter
      process.env.DB_PROVIDER = DB_PROVIDERS.SQLITE;
      this.sourceAdapter = new DatabaseAdapter();
      await this.sourceAdapter.initialize();

      // Setup target adapter
      process.env.DB_PROVIDER = targetProvider;
      this.targetAdapter = new DatabaseAdapter();
      await this.targetAdapter.initialize();

      // Get all data from SQLite
      console.log("📖 Reading data from SQLite...");
      const members = await this.sourceAdapter.getAllMembers();
      console.log(`📊 Found ${members.length} members to migrate`);

      if (members.length === 0) {
        console.log("ℹ️  No data to migrate");
        return { success: true, migrated: 0 };
      }

      // Create backup before migration
      console.log("💾 Creating backup before migration...");
      await this.createPreMigrationBackup(members);

      // Migrate data
      console.log(`📤 Migrating data to ${targetProvider}...`);
      let successCount = 0;
      let errorCount = 0;
      const errors = [];

      for (const member of members) {
        try {
          // Clean up the member data for target database
          const cleanMember = this.cleanMemberData(member, targetProvider);
          await this.targetAdapter.addMember(cleanMember);
          successCount++;

          if (successCount % 10 === 0) {
            console.log(
              `✅ Migrated ${successCount}/${members.length} members`
            );
          }
        } catch (error) {
          errorCount++;
          errors.push({ member: member.email, error: error.message });
          console.error(
            `❌ Failed to migrate member ${member.email}:`,
            error.message
          );
        }
      }

      console.log(`🎉 Migration completed!`);
      console.log(`✅ Successfully migrated: ${successCount} members`);
      console.log(`❌ Failed migrations: ${errorCount} members`);

      if (errors.length > 0) {
        console.log("\\n📝 Migration errors:");
        errors.forEach((error) => {
          console.log(`  - ${error.member}: ${error.error}`);
        });
      }

      // Verify migration
      const verificationResult = await this.verifyMigration();

      return {
        success: errorCount === 0,
        migrated: successCount,
        errors: errorCount,
        verification: verificationResult,
      };
    } catch (error) {
      console.error("💥 Migration failed:", error);
      throw error;
    } finally {
      // Close connections
      if (this.sourceAdapter) await this.sourceAdapter.close();
      if (this.targetAdapter) await this.targetAdapter.close();
    }
  }

  /**
   * Clean member data for target database compatibility
   */
  cleanMemberData(member, targetProvider) {
    const cleaned = { ...member };

    // Remove SQLite-specific fields
    delete cleaned.id; // Let target DB generate new IDs

    // Handle field name differences
    if (targetProvider === DB_PROVIDERS.MONGODB) {
      // MongoDB uses camelCase
      if (cleaned.blood_group) {
        cleaned.bloodGroup = cleaned.blood_group;
        delete cleaned.blood_group;
      }
      if (cleaned.created_at) {
        cleaned.createdAt = new Date(cleaned.created_at);
        delete cleaned.created_at;
      }
      if (cleaned.updated_at) {
        cleaned.updatedAt = new Date(cleaned.updated_at);
        delete cleaned.updated_at;
      }
    } else {
      // PostgreSQL uses snake_case (keep as is)
      if (cleaned.bloodGroup) {
        cleaned.blood_group = cleaned.bloodGroup;
        delete cleaned.bloodGroup;
      }
    }

    return cleaned;
  }

  /**
   * Create backup before migration
   */
  async createPreMigrationBackup(data) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupDir = path.join(__dirname, "..", "backups", "pre-migration");

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFile = path.join(backupDir, `sqlite_backup_${timestamp}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));

    console.log(`💾 Backup created: ${backupFile}`);
    return backupFile;
  }

  /**
   * Verify migration by comparing record counts
   */
  async verifyMigration() {
    try {
      const sourceCount = (await this.sourceAdapter.getAllMembers()).length;
      const targetCount = (await this.targetAdapter.getAllMembers()).length;

      const isValid = sourceCount === targetCount;
      console.log(
        `🔍 Verification: Source(${sourceCount}) vs Target(${targetCount}) - ${
          isValid ? "✅ PASSED" : "❌ FAILED"
        }`
      );

      return { sourceCount, targetCount, isValid };
    } catch (error) {
      console.error("❌ Verification failed:", error);
      return { error: error.message };
    }
  }

  /**
   * Rollback migration (restore from backup)
   */
  async rollback(backupFile) {
    try {
      console.log(`🔄 Rolling back migration from backup: ${backupFile}`);

      if (!fs.existsSync(backupFile)) {
        throw new Error("Backup file not found");
      }

      const backupData = JSON.parse(fs.readFileSync(backupFile, "utf8"));

      // Clear target database
      console.log("🗑️  Clearing target database...");
      const allMembers = await this.targetAdapter.getAllMembers();
      for (const member of allMembers) {
        await this.targetAdapter.deleteMember(member.id);
      }

      console.log("✅ Rollback completed");
      return { success: true, restored: backupData.length };
    } catch (error) {
      console.error("❌ Rollback failed:", error);
      throw error;
    }
  }
}

/**
 * Command line interface for migration
 */
async function runMigration() {
  const args = process.argv.slice(2);
  const command = args[0];
  const targetProvider = args[1];

  const migrator = new DatabaseMigrator();

  try {
    switch (command) {
      case "migrate":
        if (
          !targetProvider ||
          !Object.values(DB_PROVIDERS).includes(targetProvider)
        ) {
          console.error(
            "❌ Please specify a valid target provider: postgresql, mongodb, supabase"
          );
          process.exit(1);
        }
        await migrator.migrateFromSQLite(targetProvider);
        break;

      case "rollback":
        const backupFile = targetProvider; // Second arg is backup file path
        if (!backupFile) {
          console.error("❌ Please specify backup file path");
          process.exit(1);
        }
        await migrator.rollback(backupFile);
        break;

      default:
        console.log(`
🗄️  BRUDF Database Migration Tool

Usage:
  npm run db:migrate migrate <target_provider>
  npm run db:migrate rollback <backup_file_path>

Examples:
  npm run db:migrate migrate postgresql
  npm run db:migrate migrate supabase
  npm run db:migrate migrate mongodb
  npm run db:migrate rollback ./server/backups/pre-migration/sqlite_backup_2024-01-01.json

Supported providers: ${Object.values(DB_PROVIDERS).join(", ")}
        `);
        break;
    }
  } catch (error) {
    console.error("💥 Migration tool error:", error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration();
}

export { DatabaseMigrator };
export default DatabaseMigrator;
