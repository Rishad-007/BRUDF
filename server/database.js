import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const { Database } = sqlite3;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multi-layer storage configuration
const storageConfig = {
  primary:
    process.env.NODE_ENV === "production"
      ? "/opt/render/project/src/server/data/members.db"
      : path.join(__dirname, "data", "members.db"),
  backup: path.join(__dirname, "data", "backup", "members_backup.db"),
  emergencyBackup: path.join(
    __dirname,
    "data",
    "emergencyBackup",
    "members_emergency.db"
  ),
};

let db = null;

/**
 * Initialize the database connection and create tables if they don't exist
 */
async function initDatabase() {
  try {
    // Ensure all storage directories exist
    Object.values(storageConfig).forEach((dbPath) => {
      const dataDir = path.dirname(dbPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
    });

    console.log(`📁 Primary database: ${storageConfig.primary}`);

    // Open database connection
    db = await open({
      filename: storageConfig.primary,
      driver: Database,
    });

    // Create members table if it doesn't exist
    await db.exec(`
            CREATE TABLE IF NOT EXISTS members (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT NOT NULL,
                bloodGroup TEXT,
                department TEXT,
                year TEXT,
                motivation TEXT,
                experience TEXT,
                interests TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    console.log("✅ Multi-layer database initialized successfully");

    // Start automatic backup system
    await setupAutomaticBackups();
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

/**
 * Setup automatic backup system
 */
async function setupAutomaticBackups() {
  try {
    // Create initial backup
    await createDatabaseBackup();
    await createCSVBackup();

    // Schedule regular backups every hour
    setInterval(async () => {
      await createDatabaseBackup();
      await createCSVBackup();
      await cleanupOldBackups();
    }, 60 * 60 * 1000); // 1 hour

    console.log("⏰ Automatic backup system started (1 hour intervals)");
  } catch (error) {
    console.error("❌ Failed to setup automatic backups:", error);
  }
}

/**
 * Create database backup
 */
async function createDatabaseBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(
      path.dirname(storageConfig.backup),
      `backup_${timestamp}.db`
    );

    // Simple file copy for SQLite backup
    const sourceData = fs.readFileSync(storageConfig.primary);
    fs.writeFileSync(backupPath, sourceData);

    // Also create emergency backup
    fs.writeFileSync(storageConfig.emergencyBackup, sourceData);

    console.log(`🔄 Database backup created: ${backupPath}`);
  } catch (error) {
    console.error("❌ Database backup failed:", error);
  }
}

/**
 * Create CSV backup
 */
async function createCSVBackup() {
  try {
    const members = await getAllMembers();
    if (!members || members.length === 0) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const csvBackupDir = path.join(__dirname, "data", "csvBackups");

    if (!fs.existsSync(csvBackupDir)) {
      fs.mkdirSync(csvBackupDir, { recursive: true });
    }

    const csvPath = path.join(csvBackupDir, `members_backup_${timestamp}.csv`);

    // Import the CSV export function
    const { exportAllDataToCSV } = await import("./csvReader.js");
    const csvContent = exportAllDataToCSV(members);

    fs.writeFileSync(csvPath, csvContent);
    console.log(`📊 CSV backup created: ${csvPath}`);
  } catch (error) {
    console.error("❌ CSV backup failed:", error);
  }
}

/**
 * Clean up old backup files (keep last 20 backups)
 */
async function cleanupOldBackups() {
  try {
    const backupDir = path.dirname(storageConfig.backup);
    const csvBackupDir = path.join(__dirname, "data", "csvBackups");

    [backupDir, csvBackupDir].forEach((dir) => {
      if (fs.existsSync(dir)) {
        const files = fs
          .readdirSync(dir)
          .filter((file) => file.includes("backup_"))
          .map((file) => ({
            name: file,
            path: path.join(dir, file),
            time: fs.statSync(path.join(dir, file)).mtime,
          }))
          .sort((a, b) => b.time - a.time);

        // Keep only the latest 20 backups
        if (files.length > 20) {
          files.slice(20).forEach((file) => {
            fs.unlinkSync(file.path);
            console.log(`🗑️ Cleaned up old backup: ${file.name}`);
          });
        }
      }
    });
  } catch (error) {
    console.error("❌ Backup cleanup failed:", error);
  }
}

/**
 * Add a new member to the database
 */
async function addMember(memberData) {
  try {
    const {
      name,
      email,
      phone,
      bloodGroup,
      department,
      year,
      motivation,
      experience,
      interests,
    } = memberData;

    // Convert interests array to JSON string
    const interestsJson = interests ? JSON.stringify(interests) : null;

    const result = await db.run(
      "INSERT INTO members (name, email, phone, bloodGroup, department, year, motivation, experience, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        phone,
        bloodGroup,
        department,
        year,
        motivation,
        experience,
        interestsJson,
      ]
    );

    // Return the newly created member with its ID
    const newMember = await db.get("SELECT * FROM members WHERE id = ?", [
      result.lastID,
    ]);

    // Parse interests back to array
    if (newMember.interests) {
      newMember.interests = JSON.parse(newMember.interests);
    }

    return newMember;
  } catch (error) {
    // Handle SQLite constraint errors
    if (
      error.code === "SQLITE_CONSTRAINT_UNIQUE" ||
      error.message.includes("UNIQUE constraint failed") ||
      error.message.includes("email")
    ) {
      throw new Error("A member with this email already exists");
    }
    console.error("Error adding member:", error);
    throw error;
  }
}

/**
 * Get all members from the database
 */
async function getAllMembers() {
  try {
    const members = await db.all(
      "SELECT * FROM members ORDER BY created_at DESC"
    );

    // Parse interests JSON for each member
    return members.map((member) => ({
      ...member,
      interests: member.interests ? JSON.parse(member.interests) : [],
      submittedAt: member.created_at, // For backward compatibility with frontend
    }));
  } catch (error) {
    console.error("Error getting members:", error);
    throw error;
  }
}

/**
 * Get a member by ID
 */
async function getMemberById(id) {
  try {
    const member = await db.get("SELECT * FROM members WHERE id = ?", [id]);
    return member;
  } catch (error) {
    console.error("Error getting member by ID:", error);
    throw error;
  }
}

/**
 * Delete a member by ID
 */
async function deleteMember(id) {
  try {
    const result = await db.run("DELETE FROM members WHERE id = ?", [id]);
    return result.changes > 0;
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
}

/**
 * Update a member by ID
 */
async function updateMember(id, memberData) {
  try {
    const {
      name,
      email,
      phone,
      bloodGroup,
      department,
      year,
      motivation,
      experience,
      interests,
    } = memberData;

    // Convert interests array to JSON string
    const interestsJson = interests ? JSON.stringify(interests) : null;

    const result = await db.run(
      "UPDATE members SET name = ?, email = ?, phone = ?, bloodGroup = ?, department = ?, year = ?, motivation = ?, experience = ?, interests = ? WHERE id = ?",
      [
        name,
        email,
        phone,
        bloodGroup,
        department,
        year,
        motivation,
        experience,
        interestsJson,
        id,
      ]
    );

    if (result.changes === 0) {
      return null; // Member not found
    }

    // Return the updated member
    const updatedMember = await db.get("SELECT * FROM members WHERE id = ?", [
      id,
    ]);

    // Parse interests back to array
    if (updatedMember.interests) {
      updatedMember.interests = JSON.parse(updatedMember.interests);
    }

    return updatedMember;
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      throw new Error("A member with this email already exists");
    }
    console.error("Error updating member:", error);
    throw error;
  }
}

/**
 * Get database statistics
 */
async function getStats() {
  try {
    const result = await db.get("SELECT COUNT(*) as total FROM members");
    return { totalMembers: result.total };
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
}

/**
 * Close database connection
 */
async function closeDatabase() {
  if (db) {
    await db.close();
    console.log("Database connection closed");
  }
}

export {
  initDatabase,
  addMember,
  getAllMembers,
  getMemberById,
  deleteMember,
  updateMember,
  getStats,
  closeDatabase,
  createDatabaseBackup,
  createCSVBackup,
  cleanupOldBackups,
};
