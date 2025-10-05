/**
 * Database Connection Test Script for BRUDF Website
 * Tests connectivity to different database providers
 */

import { getDatabaseConfig, DB_PROVIDERS } from "../databaseConfig.js";
import DatabaseAdapter from "../databaseAdapter.js";

async function testConnection() {
  console.log("🔍 Testing database connection...");

  const config = getDatabaseConfig();
  console.log(`🎯 Testing ${config.type} connection`);

  let adapter = null;

  try {
    adapter = new DatabaseAdapter();
    const startTime = Date.now();

    await adapter.initialize();

    const endTime = Date.now();
    const connectionTime = endTime - startTime;

    console.log(`✅ Connection successful! (${connectionTime}ms)`);

    // Test basic operations
    console.log("🧪 Testing basic operations...");

    // Test read operation
    const readStart = Date.now();
    const members = await adapter.getAllMembers();
    const readTime = Date.now() - readStart;

    console.log(`📖 Read test: ${members.length} records (${readTime}ms)`);

    // Test write operation (if requested)
    if (process.argv.includes("--test-write")) {
      console.log("✏️  Testing write operation...");

      const testMember = {
        name: `Test User ${Date.now()}`,
        email: `test_${Date.now()}@brudf.org`,
        phone: "+8801712345678",
        bloodGroup: "O+",
        department: "Test",
        year: "Test",
        motivation: "Connection test",
        experience: "Test experience",
        interests: "Testing",
      };

      const writeStart = Date.now();
      const newMember = await adapter.addMember(testMember);
      const writeTime = Date.now() - writeStart;

      console.log(`✏️  Write test: Record created (${writeTime}ms)`);

      // Clean up test record
      await adapter.deleteMember(newMember.id);
      console.log("🗑️  Test record cleaned up");
    }

    // Performance summary
    console.log("\\n📊 Performance Summary:");
    console.log(`  Connection: ${connectionTime}ms`);
    console.log(`  Read Query: ${readTime}ms`);
    console.log(`  Provider: ${config.type}`);

    // Connection info
    console.log("\\n🔗 Connection Details:");
    switch (config.type) {
      case DB_PROVIDERS.SQLITE:
        console.log(`  File: ${config.connection.filename}`);
        break;
      case DB_PROVIDERS.POSTGRESQL:
        console.log(
          `  Host: ${config.connection.host}:${config.connection.port}`
        );
        console.log(`  Database: ${config.connection.database}`);
        console.log(`  User: ${config.connection.user}`);
        break;
      case DB_PROVIDERS.MONGODB:
        const urlWithoutPassword = config.connection.url.replace(
          /:\/\/([^:]+):([^@]+)@/,
          "://***:***@"
        );
        console.log(`  URL: ${urlWithoutPassword}`);
        break;
    }

    console.log("\\n🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Connection test failed:", error.message);

    // Provide helpful error messages
    if (error.message.includes("ECONNREFUSED")) {
      console.error("💡 Database server is not running or unreachable");
    } else if (error.message.includes("authentication")) {
      console.error("💡 Check your username and password");
    } else if (error.message.includes("ENOTFOUND")) {
      console.error("💡 Check your database host address");
    } else if (
      error.message.includes("database") &&
      error.message.includes("does not exist")
    ) {
      console.error("💡 Database does not exist - run setup first");
    }

    console.error("\\n🔧 Troubleshooting:");
    console.error("  1. Check your environment variables");
    console.error("  2. Ensure database server is running");
    console.error("  3. Verify network connectivity");
    console.error("  4. Check database credentials");

    process.exit(1);
  } finally {
    if (adapter) {
      await adapter.close();
    }
  }
}

async function testAllProviders() {
  console.log("🌐 Testing all available database providers...");

  const providers = [DB_PROVIDERS.SQLITE];

  // Add other providers if environment variables exist
  if (process.env.POSTGRES_HOST || process.env.DATABASE_URL) {
    providers.push(DB_PROVIDERS.POSTGRESQL);
  }

  if (process.env.SUPABASE_URL) {
    providers.push(DB_PROVIDERS.SUPABASE);
  }

  if (process.env.MONGODB_URI) {
    providers.push(DB_PROVIDERS.MONGODB);
  }

  console.log(
    `🎯 Testing ${providers.length} providers: ${providers.join(", ")}`
  );

  for (const provider of providers) {
    console.log(`\\n--- Testing ${provider} ---`);

    const originalProvider = process.env.DB_PROVIDER;
    process.env.DB_PROVIDER = provider;

    try {
      await testConnection();
      console.log(`✅ ${provider}: PASSED`);
    } catch (error) {
      console.log(`❌ ${provider}: FAILED - ${error.message}`);
    }

    process.env.DB_PROVIDER = originalProvider;
  }
}

// Command line interface
const showHelp = () => {
  console.log(`
🔍 BRUDF Database Connection Test Tool

Usage:
  npm run db:test [options]

Options:
  --test-write    Test write operations (creates and deletes a test record)
  --all           Test all configured database providers
  --help          Show this help message

Examples:
  npm run db:test
  npm run db:test -- --test-write
  npm run db:test -- --all
  DB_PROVIDER=postgresql npm run db:test
  `);
};

if (process.argv.includes("--help")) {
  showHelp();
} else if (process.argv.includes("--all")) {
  testAllProviders();
} else {
  testConnection();
}
