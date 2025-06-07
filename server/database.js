import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const { Database } = sqlite3;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const DB_PATH = path.join(__dirname, "data", "members.db");

let db = null;

/**
 * Initialize the database connection and create tables if they don't exist
 */
async function initDatabase() {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Open database connection
    db = await open({
      filename: DB_PATH,
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
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    console.log("Database initialized successfully");
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
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
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
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
};
