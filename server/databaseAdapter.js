/**
 * Database Abstraction Layer for BRUDF Website
 * Provides unified interface for SQLite, PostgreSQL, and MongoDB
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import pg from "pg";
import { MongoClient } from "mongodb";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import {
  getDatabaseConfig,
  DB_PROVIDERS,
  appConfig,
} from "./databaseConfig.js";

const { Pool } = pg;

class DatabaseAdapter {
  constructor() {
    this.config = getDatabaseConfig();
    this.connection = null;
    this.type = this.config.type;
  }

  /**
   * Initialize database connection based on provider type
   */
  async initialize() {
    try {
      console.log(`🔗 Initializing ${this.type} database connection...`);

      switch (this.type) {
        case DB_PROVIDERS.SQLITE:
          await this.initSQLite();
          break;
        case DB_PROVIDERS.POSTGRESQL:
          await this.initPostgreSQL();
          break;
        case DB_PROVIDERS.MONGODB:
          await this.initMongoDB();
          break;
        default:
          throw new Error(`Unsupported database type: ${this.type}`);
      }

      await this.createTables();
      console.log(`✅ ${this.type} database initialized successfully`);
      return this.connection;
    } catch (error) {
      console.error(`❌ Failed to initialize ${this.type} database:`, error);
      throw error;
    }
  }

  /**
   * Initialize SQLite connection
   */
  async initSQLite() {
    const dataDir = path.dirname(this.config.connection.filename);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    this.connection = await open({
      filename: this.config.connection.filename,
      driver: sqlite3.Database,
    });
  }

  /**
   * Initialize PostgreSQL connection
   */
  async initPostgreSQL() {
    // Check if this is Supabase
    if (this.config.supabase) {
      this.supabaseClient = createClient(
        this.config.supabase.url,
        this.config.supabase.anonKey
      );
    }

    this.connection = new Pool({
      ...this.config.connection,
      ...this.config.pool,
    });

    // Test connection
    const client = await this.connection.connect();
    await client.query("SELECT NOW()");
    client.release();
  }

  /**
   * Initialize MongoDB connection
   */
  async initMongoDB() {
    this.connection = new MongoClient(
      this.config.connection.url,
      this.config.connection.options
    );
    await this.connection.connect();
    this.db = this.connection.db();
  }

  /**
   * Create tables/collections based on database type
   */
  async createTables() {
    switch (this.type) {
      case DB_PROVIDERS.SQLITE:
      case DB_PROVIDERS.POSTGRESQL:
        await this.createSQLTables();
        break;
      case DB_PROVIDERS.MONGODB:
        await this.createMongoCollections();
        break;
    }
  }

  /**
   * Create SQL tables for SQLite/PostgreSQL
   */
  async createSQLTables() {
    const membersTableSQL = `
      CREATE TABLE IF NOT EXISTS members (
        id ${
          this.type === DB_PROVIDERS.SQLITE
            ? "INTEGER PRIMARY KEY AUTOINCREMENT"
            : "SERIAL PRIMARY KEY"
        },
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        blood_group VARCHAR(5),
        department VARCHAR(100),
        year VARCHAR(10),
        motivation TEXT,
        experience TEXT,
        interests TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    if (this.type === DB_PROVIDERS.SQLITE) {
      await this.connection.exec(membersTableSQL);
    } else {
      const client = await this.connection.connect();
      await client.query(membersTableSQL);

      // Create indexes for PostgreSQL
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_members_email ON members(email)"
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_members_department ON members(department)"
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at)"
      );

      client.release();
    }
  }

  /**
   * Create MongoDB collections
   */
  async createMongoCollections() {
    const collections = await this.db
      .listCollections({ name: "members" })
      .toArray();

    if (collections.length === 0) {
      await this.db.createCollection("members", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "phone"],
            properties: {
              name: { bsonType: "string" },
              email: { bsonType: "string" },
              phone: { bsonType: "string" },
              bloodGroup: { bsonType: "string" },
              department: { bsonType: "string" },
              year: { bsonType: "string" },
              motivation: { bsonType: "string" },
              experience: { bsonType: "string" },
              interests: { bsonType: "string" },
              createdAt: { bsonType: "date" },
              updatedAt: { bsonType: "date" },
            },
          },
        },
      });

      // Create indexes
      await this.db
        .collection("members")
        .createIndex({ email: 1 }, { unique: true });
      await this.db.collection("members").createIndex({ department: 1 });
      await this.db.collection("members").createIndex({ createdAt: -1 });
    }
  }

  /**
   * Add a new member
   */
  async addMember(memberData) {
    const member = this.validateMemberData(memberData);

    switch (this.type) {
      case DB_PROVIDERS.SQLITE:
        return await this.addMemberSQL(member);
      case DB_PROVIDERS.POSTGRESQL:
        return await this.addMemberSQL(member);
      case DB_PROVIDERS.MONGODB:
        return await this.addMemberMongo(member);
      default:
        throw new Error(`Unsupported database type: ${this.type}`);
    }
  }

  /**
   * Get all members
   */
  async getAllMembers() {
    switch (this.type) {
      case DB_PROVIDERS.SQLITE:
      case DB_PROVIDERS.POSTGRESQL:
        return await this.getAllMembersSQL();
      case DB_PROVIDERS.MONGODB:
        return await this.getAllMembersMongo();
      default:
        throw new Error(`Unsupported database type: ${this.type}`);
    }
  }

  /**
   * Delete a member
   */
  async deleteMember(id) {
    switch (this.type) {
      case DB_PROVIDERS.SQLITE:
      case DB_PROVIDERS.POSTGRESQL:
        return await this.deleteMemberSQL(id);
      case DB_PROVIDERS.MONGODB:
        return await this.deleteMemberMongo(id);
      default:
        throw new Error(`Unsupported database type: ${this.type}`);
    }
  }

  // SQL implementations
  async addMemberSQL(member) {
    let sql, params;

    if (this.type === DB_PROVIDERS.SQLITE) {
      sql = `
        INSERT INTO members (name, email, phone, blood_group, department, year, motivation, experience, interests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      params = [
        member.name,
        member.email,
        member.phone,
        member.bloodGroup,
        member.department,
        member.year,
        member.motivation,
        member.experience,
        member.interests,
      ];

      const result = await this.connection.run(sql, params);
      return { id: result.lastID, ...member };
    } else {
      // PostgreSQL syntax
      sql = `
        INSERT INTO members (name, email, phone, blood_group, department, year, motivation, experience, interests)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      params = [
        member.name,
        member.email,
        member.phone,
        member.bloodGroup,
        member.department,
        member.year,
        member.motivation,
        member.experience,
        member.interests,
      ];

      const client = await this.connection.connect();
      const result = await client.query(sql, params);
      client.release();
      return result.rows[0];
    }
  }

  async getAllMembersSQL() {
    const sql = "SELECT * FROM members ORDER BY created_at DESC";

    if (this.type === DB_PROVIDERS.SQLITE) {
      return await this.connection.all(sql);
    } else {
      const client = await this.connection.connect();
      const result = await client.query(sql);
      client.release();
      return result.rows;
    }
  }

  async deleteMemberSQL(id) {
    const sql = "DELETE FROM members WHERE id = ?";

    if (this.type === DB_PROVIDERS.SQLITE) {
      const result = await this.connection.run(sql, [id]);
      return result.changes > 0;
    } else {
      const client = await this.connection.connect();
      const result = await client.query("DELETE FROM members WHERE id = $1", [
        id,
      ]);
      client.release();
      return result.rowCount > 0;
    }
  }

  // MongoDB implementations
  async addMemberMongo(member) {
    const memberDoc = {
      ...member,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.db.collection("members").insertOne(memberDoc);
    return { id: result.insertedId, ...memberDoc };
  }

  async getAllMembersMongo() {
    return await this.db
      .collection("members")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  }

  async deleteMemberMongo(id) {
    const result = await this.db.collection("members").deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  /**
   * Validate member data
   */
  validateMemberData(data) {
    const validation = appConfig.validation;

    if (!data.name || !data.email || !data.phone) {
      throw new Error("Name, email, and phone are required fields");
    }

    if (!validation.email.test(data.email)) {
      throw new Error("Invalid email format");
    }

    if (!validation.phone.test(data.phone)) {
      throw new Error("Invalid phone number format");
    }

    if (data.bloodGroup && !validation.bloodGroup.includes(data.bloodGroup)) {
      throw new Error("Invalid blood group");
    }

    return data;
  }

  /**
   * Close database connection
   */
  async close() {
    if (this.connection) {
      switch (this.type) {
        case DB_PROVIDERS.SQLITE:
          await this.connection.close();
          break;
        case DB_PROVIDERS.POSTGRESQL:
          await this.connection.end();
          break;
        case DB_PROVIDERS.MONGODB:
          await this.connection.close();
          break;
      }
      console.log(`📴 ${this.type} database connection closed`);
    }
  }

  /**
   * Create database backup
   */
  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupName = `backup_${timestamp}`;

    switch (this.type) {
      case DB_PROVIDERS.SQLITE:
        return await this.createSQLiteBackup(backupName);
      case DB_PROVIDERS.POSTGRESQL:
        return await this.createPostgreSQLBackup(backupName);
      case DB_PROVIDERS.MONGODB:
        return await this.createMongoBackup(backupName);
    }
  }

  async createSQLiteBackup(backupName) {
    const backupPath = path.join(
      path.dirname(this.config.connection.filename),
      "backups",
      `${backupName}.db`
    );
    const backupDir = path.dirname(backupPath);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    await this.connection.backup(backupPath);
    return backupPath;
  }

  async createPostgreSQLBackup(backupName) {
    // This would require pg_dump utility - implementation depends on deployment environment
    console.log(`PostgreSQL backup would be created: ${backupName}`);
    return backupName;
  }

  async createMongoBackup(backupName) {
    // Export all data as JSON
    const data = await this.getAllMembers();
    const backupPath = path.join(__dirname, "backups", `${backupName}.json`);
    const backupDir = path.dirname(backupPath);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    return backupPath;
  }
}

// Export singleton instance
let dbAdapter = null;

export const initDatabase = async () => {
  if (!dbAdapter) {
    dbAdapter = new DatabaseAdapter();
    await dbAdapter.initialize();
  }
  return dbAdapter;
};

export const getDatabase = () => {
  if (!dbAdapter) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return dbAdapter;
};

export const addMember = async (memberData) => {
  const db = getDatabase();
  return await db.addMember(memberData);
};

export const getAllMembers = async () => {
  const db = getDatabase();
  return await db.getAllMembers();
};

export const deleteMember = async (id) => {
  const db = getDatabase();
  return await db.deleteMember(id);
};

export const closeDatabase = async () => {
  if (dbAdapter) {
    await dbAdapter.close();
    dbAdapter = null;
  }
};

export const createDatabaseBackup = async () => {
  const db = getDatabase();
  return await db.createBackup();
};

export default DatabaseAdapter;
