/**
 * Database Setup Script for BRUDF Website
 * Initializes and configures database based on environment
 */

import dotenv from "dotenv";
import { getDatabaseConfig, DB_PROVIDERS } from "../databaseConfig.js";
import DatabaseAdapter from "../databaseAdapter.js";

// Load environment variables
dotenv.config();

async function setupDatabase() {
  console.log("🚀 Setting up BRUDF Database...");

  try {
    const config = getDatabaseConfig();
    console.log(`📊 Database Provider: ${config.type}`);

    const adapter = new DatabaseAdapter();
    await adapter.initialize();

    console.log("✅ Database setup completed successfully!");
    console.log(`🔗 Connected to: ${config.type}`);

    // Test basic operations
    console.log("🧪 Running basic tests...");

    // Test getting all members (should be empty initially)
    const members = await adapter.getAllMembers();
    console.log(`📊 Current member count: ${members.length}`);

    // Test adding a sample member (optional)
    if (process.argv.includes("--add-sample")) {
      console.log("👤 Adding sample member...");
      const sampleMember = {
        name: "Test User",
        email: "test@brudf.org",
        phone: "+8801712345678",
        bloodGroup: "O+",
        department: "CSE",
        year: "3rd",
        motivation: "Sample motivation",
        experience: "Sample experience",
        interests: "Sample interests",
      };

      try {
        await adapter.addMember(sampleMember);
        console.log("✅ Sample member added successfully");
      } catch (error) {
        if (error.message.includes("UNIQUE constraint")) {
          console.log("ℹ️  Sample member already exists");
        } else {
          throw error;
        }
      }
    }

    await adapter.close();
    console.log("🎉 Database setup completed!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    console.error(
      "💡 Please check your environment variables and database configuration"
    );
    process.exit(1);
  }
}

// Command line options
const showHelp = () => {
  console.log(`
🗄️  BRUDF Database Setup Tool

Usage:
  npm run db:setup [options]

Options:
  --add-sample    Add a sample member for testing
  --help          Show this help message

Environment Variables Required:
  DB_PROVIDER     Database provider (sqlite, postgresql, mongodb, supabase)
  
For PostgreSQL/Supabase:
  POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
  
For Supabase additionally:
  SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY
  
For MongoDB:
  MONGODB_URI

Examples:
  npm run db:setup
  npm run db:setup -- --add-sample
  DB_PROVIDER=postgresql npm run db:setup
  `);
};

if (process.argv.includes("--help")) {
  showHelp();
} else {
  setupDatabase();
}
