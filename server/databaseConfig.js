/**
 * Enhanced Database Configuration for BRUDF Website
 * Supports multiple database types: SQLite, PostgreSQL, MongoDB
 */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database provider types
export const DB_PROVIDERS = {
  SQLITE: "sqlite",
  POSTGRESQL: "postgresql",
  MONGODB: "mongodb",
  SUPABASE: "supabase",
};

// Environment-based configuration
export const getDatabaseConfig = () => {
  const env = process.env.NODE_ENV || "development";
  const dbProvider = process.env.DB_PROVIDER || DB_PROVIDERS.SQLITE;

  const configs = {
    [DB_PROVIDERS.SQLITE]: {
      type: DB_PROVIDERS.SQLITE,
      connection: {
        filename:
          env === "production"
            ? "/opt/render/project/src/server/data/members.db"
            : path.join(__dirname, "data", "members.db"),
      },
      pool: { min: 1, max: 1 },
    },

    [DB_PROVIDERS.POSTGRESQL]: {
      type: DB_PROVIDERS.POSTGRESQL,
      connection: {
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.POSTGRES_PORT || 5432,
        database: process.env.POSTGRES_DB || "brudf_db",
        user: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "",
        ssl: env === "production" ? { rejectUnauthorized: false } : false,
      },
      pool: { min: 2, max: 10 },
    },

    [DB_PROVIDERS.SUPABASE]: {
      type: DB_PROVIDERS.POSTGRESQL, // Supabase uses PostgreSQL
      connection: {
        host: process.env.SUPABASE_HOST,
        port: 5432,
        database: process.env.SUPABASE_DB || "postgres",
        user: process.env.SUPABASE_USER || "postgres",
        password: process.env.SUPABASE_PASSWORD,
        ssl: { rejectUnauthorized: false },
      },
      pool: { min: 1, max: 3 }, // Reduced pool size for Supabase session mode
      supabase: {
        url: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY,
        serviceKey: process.env.SUPABASE_SERVICE_KEY,
      },
    },

    [DB_PROVIDERS.MONGODB]: {
      type: DB_PROVIDERS.MONGODB,
      connection: {
        url: process.env.MONGODB_URI || "mongodb://localhost:27017/brudf_db",
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          maxPoolSize: 10,
          minPoolSize: 2,
        },
      },
    },
  };

  return configs[dbProvider];
};

// Security and backup configuration
export const securityConfig = {
  encryption: {
    enabled: process.env.NODE_ENV === "production",
    algorithm: "aes-256-gcm",
    key: process.env.DB_ENCRYPTION_KEY,
  },

  backup: {
    enabled: true,
    interval: 60 * 60 * 1000, // 1 hour
    retention: 7, // Keep 7 backups
    locations: [
      "local", // Local file system
      "cloud", // Cloud storage (if configured)
    ],
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // Limit each IP to 100 requests per windowMs
    skipSuccessfulRequests: false,
  },
};

// Application-specific database settings
export const appConfig = {
  tables: {
    members: {
      name: "members",
      schema: {
        id: "PRIMARY KEY",
        name: "TEXT NOT NULL",
        email: "TEXT UNIQUE NOT NULL",
        phone: "TEXT NOT NULL",
        bloodGroup: "TEXT",
        department: "TEXT",
        year: "TEXT",
        motivation: "TEXT",
        experience: "TEXT",
        interests: "TEXT",
        created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      },
    },
  },

  indexes: [
    { table: "members", columns: ["email"], unique: true },
    { table: "members", columns: ["department"] },
    { table: "members", columns: ["created_at"] },
  ],

  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+88)?01[3-9]\d{8}$/, // Bangladesh phone format
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
};

export default {
  getDatabaseConfig,
  securityConfig,
  appConfig,
  DB_PROVIDERS,
};
