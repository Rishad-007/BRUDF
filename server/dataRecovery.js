#!/usr/bin/env node

/**
 * BRUDF Data Recovery Script
 * This script helps recover data from multiple backup sources
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { persistenceManager } from "./csvReader.js";
import { initDatabase, addMember } from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DataRecovery {
  constructor() {
    this.recoveryLog = [];
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    this.recoveryLog.push(logMessage);
  }

  /**
   * Scan all possible data sources
   */
  async scanDataSources() {
    this.log("🔍 Scanning all data sources...");

    const dataSources = {
      database: {
        primary: path.join(__dirname, "data", "members.db"),
        backup: path.join(__dirname, "data", "backup"),
        emergency: path.join(
          __dirname,
          "data",
          "emergencyBackup",
          "members_emergency.db"
        ),
      },
      csv: {
        original: path.join(
          __dirname,
          "data",
          "previousData",
          "memberdata.csv"
        ),
        backups: path.join(__dirname, "data", "csvBackups"),
      },
      json: {
        primary: path.join(__dirname, "data", "primaryData"),
        backup: path.join(__dirname, "data", "backupData"),
        emergency: path.join(__dirname, "data", "emergencyBackup"),
      },
    };

    const availableSources = {};

    // Check database sources
    for (const [key, dbPath] of Object.entries(dataSources.database)) {
      if (fs.existsSync(dbPath)) {
        availableSources[`database_${key}`] = dbPath;
        this.log(`✅ Found database source: ${key} at ${dbPath}`);
      } else {
        this.log(`❌ Missing database source: ${key} at ${dbPath}`);
      }
    }

    // Check CSV sources
    for (const [key, csvPath] of Object.entries(dataSources.csv)) {
      if (fs.existsSync(csvPath)) {
        if (fs.statSync(csvPath).isDirectory()) {
          const files = fs
            .readdirSync(csvPath)
            .filter((f) => f.endsWith(".csv"));
          if (files.length > 0) {
            availableSources[`csv_${key}`] = { path: csvPath, files };
            this.log(`✅ Found CSV source: ${key} with ${files.length} files`);
          }
        } else {
          availableSources[`csv_${key}`] = csvPath;
          this.log(`✅ Found CSV source: ${key} at ${csvPath}`);
        }
      } else {
        this.log(`❌ Missing CSV source: ${key} at ${csvPath}`);
      }
    }

    // Check JSON sources
    for (const [key, jsonPath] of Object.entries(dataSources.json)) {
      if (fs.existsSync(jsonPath)) {
        const files = fs
          .readdirSync(jsonPath)
          .filter((f) => f.endsWith(".json"));
        if (files.length > 0) {
          availableSources[`json_${key}`] = { path: jsonPath, files };
          this.log(`✅ Found JSON source: ${key} with ${files.length} files`);
        }
      } else {
        this.log(`❌ Missing JSON source: ${key} at ${jsonPath}`);
      }
    }

    return availableSources;
  }

  /**
   * Attempt to recover data from all sources
   */
  async recoverAllData() {
    this.log("🚨 Starting emergency data recovery...");

    const sources = await this.scanDataSources();
    let allRecoveredData = [];

    // Try to load from JSON backups first (most recent)
    for (const [sourceName, sourceInfo] of Object.entries(sources)) {
      if (sourceName.startsWith("json_")) {
        try {
          const data = await this.loadFromJSONSource(sourceInfo);
          if (data && data.length > 0) {
            allRecoveredData = [...allRecoveredData, ...data];
            this.log(`🔄 Recovered ${data.length} records from ${sourceName}`);
          }
        } catch (error) {
          this.log(`❌ Failed to recover from ${sourceName}: ${error.message}`);
        }
      }
    }

    // Try CSV sources
    if (sources.csv_original) {
      try {
        const { readPreviousData } = await import("./csvReader.js");
        const csvData = readPreviousData();
        if (csvData && csvData.length > 0) {
          allRecoveredData = [...allRecoveredData, ...csvData];
          this.log(`🔄 Recovered ${csvData.length} records from original CSV`);
        }
      } catch (error) {
        this.log(`❌ Failed to recover from CSV: ${error.message}`);
      }
    }

    // Remove duplicates based on email
    const uniqueData = allRecoveredData.filter(
      (member, index, self) =>
        index === self.findIndex((m) => m.email === member.email)
    );

    this.log(`📊 Total unique records recovered: ${uniqueData.length}`);
    return uniqueData;
  }

  /**
   * Load data from JSON source
   */
  async loadFromJSONSource(sourceInfo) {
    const data = [];

    if (sourceInfo.files) {
      // Sort files by modification time (newest first)
      const sortedFiles = sourceInfo.files
        .map((file) => ({
          name: file,
          path: path.join(sourceInfo.path, file),
          mtime: fs.statSync(path.join(sourceInfo.path, file)).mtime,
        }))
        .sort((a, b) => b.mtime - a.mtime);

      // Try to load from the most recent file
      for (const file of sortedFiles.slice(0, 3)) {
        // Try top 3 most recent
        try {
          const fileData = JSON.parse(fs.readFileSync(file.path, "utf-8"));
          if (Array.isArray(fileData) && fileData.length > 0) {
            data.push(...fileData);
            this.log(`✅ Loaded data from ${file.name}`);
            break; // Use the first successful load
          }
        } catch (error) {
          this.log(`⚠️ Could not load ${file.name}: ${error.message}`);
        }
      }
    }

    return data;
  }

  /**
   * Restore data to database
   */
  async restoreToDatabase(recoveredData) {
    if (!recoveredData || recoveredData.length === 0) {
      this.log("❌ No data to restore");
      return false;
    }

    try {
      this.log("🔄 Initializing database for restoration...");
      await initDatabase();

      let successCount = 0;
      let errorCount = 0;

      for (const member of recoveredData) {
        try {
          // Skip if this is previous CSV data and we already have it
          if (member.isPreviousData) continue;

          await addMember({
            name: member.name,
            email: member.email,
            phone: member.phone,
            bloodGroup: member.bloodGroup,
            department: member.department,
            year: member.year,
            motivation: member.motivation,
            experience: member.experience,
            interests: member.interests,
          });

          successCount++;
        } catch (error) {
          if (error.message.includes("already exists")) {
            // Skip duplicates
            continue;
          }
          errorCount++;
          this.log(
            `⚠️ Failed to restore member ${member.email}: ${error.message}`
          );
        }
      }

      this.log(
        `✅ Restoration complete: ${successCount} restored, ${errorCount} errors`
      );
      return true;
    } catch (error) {
      this.log(`❌ Database restoration failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Create recovery report
   */
  saveRecoveryReport() {
    const reportPath = path.join(
      __dirname,
      "data",
      `recovery_report_${Date.now()}.txt`
    );
    const reportContent = [
      "BRUDF Data Recovery Report",
      "=" * 50,
      `Recovery Date: ${new Date().toISOString()}`,
      "",
      ...this.recoveryLog,
    ].join("\n");

    fs.writeFileSync(reportPath, reportContent);
    this.log(`📄 Recovery report saved: ${reportPath}`);
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const recovery = new DataRecovery();

  console.log("🚨 BRUDF Data Recovery Tool");
  console.log("===========================");

  (async () => {
    try {
      // Scan available sources
      await recovery.scanDataSources();

      // Recover data
      const recoveredData = await recovery.recoverAllData();

      if (recoveredData.length > 0) {
        console.log("\n🔄 Attempting to restore data to database...");
        await recovery.restoreToDatabase(recoveredData);
      }

      // Save report
      recovery.saveRecoveryReport();

      console.log("\n✅ Recovery process completed!");
    } catch (error) {
      console.error("❌ Recovery failed:", error);
      recovery.saveRecoveryReport();
    }
  })();
}

export { DataRecovery };
