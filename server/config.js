import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Multi-layer persistence configuration
 */
export const config = {
  storage: {
    // Primary database
    database: {
      type: process.env.DB_TYPE || "sqlite",
      url: process.env.DATABASE_URL || path.join(__dirname, "data/members.db"),
      backup: true,
      backupInterval: 60 * 60 * 1000, // 1 hour
    },

    // File-based backups
    files: {
      enabled: true,
      locations: [
        "data/primaryData",
        "data/backupData",
        "data/emergencyBackup",
      ],
      autoBackup: true,
      backupInterval: 30 * 60 * 1000, // 30 minutes
    },

    // CSV backups
    csv: {
      enabled: true,
      location: "data/csvBackups",
      autoExport: true,
      exportInterval: 60 * 60 * 1000, // 1 hour
    },

    // Cloud storage (future enhancement)
    cloud: {
      enabled: false,
      provider: process.env.CLOUD_PROVIDER, // 'aws', 'firebase', etc.
      credentials: process.env.CLOUD_CREDENTIALS,
    },
  },

  backup: {
    maxBackups: 50, // Keep last 50 backups
    cleanupInterval: 24 * 60 * 60 * 1000, // Daily cleanup
    compression: false, // Enable gzip compression for backups
    retentionDays: 30, // Keep backups for 30 days
  },

  // Environment-specific settings
  environment: {
    development: {
      logLevel: "debug",
      backupFrequency: "high",
    },
    production: {
      logLevel: "info",
      backupFrequency: "normal",
      persistentDisk: "/opt/render/project/src/server/data",
    },
  },

  // Admin settings
  admin: {
    password: process.env.ADMIN_PASSWORD || "brudf2024admin",
    sessionTimeout: 2 * 60 * 60 * 1000, // 2 hours
    maxLoginAttempts: 5,
  },
};

export default config;
