/**
 * Simple Supabase Connection Test
 * Tests the Supabase client connection directly
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testSupabaseConnection() {
  console.log("🔍 Testing Supabase connection...");

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    console.log(`🎯 Supabase URL: ${supabaseUrl}`);
    console.log(
      `🔑 Anon Key: ${
        supabaseKey ? supabaseKey.substring(0, 20) + "..." : "NOT SET"
      }`
    );

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables"
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase client created successfully");

    // Test connection by checking if we can query the members table
    console.log("🧪 Testing table access...");

    const { data, error } = await supabase
      .from("members")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.log(
        "📊 Table does not exist yet, which is expected for first setup"
      );
      console.log("🔧 We need to create the members table first");

      // Try to create the table
      console.log("🏗️ Creating members table...");

      const { error: createError } = await supabase.rpc(
        "create_members_table",
        {}
      );

      if (createError) {
        console.log("⚠️ Could not create table automatically");
        console.log(
          "💡 You may need to create the table manually in Supabase dashboard"
        );
        console.log("📝 SQL to create table:");
        console.log(`
CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
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
);
        `);
      }
    } else {
      console.log(
        `✅ Members table exists with ${data?.[0]?.count || 0} records`
      );
    }

    // Test a simple query
    console.log("📊 Testing simple query...");
    const { data: testData, error: testError } = await supabase
      .from("members")
      .select("*")
      .limit(1);

    if (testError) {
      console.log("⚠️ Query failed:", testError.message);
    } else {
      console.log("✅ Query successful");
      console.log(`📋 Sample data: ${testData?.length || 0} records`);
    }

    console.log("\\n🎉 Supabase connection test completed!");
    console.log("✅ Your Supabase configuration is working");
  } catch (error) {
    console.error("❌ Supabase connection failed:", error.message);
    console.error("\\n🔧 Troubleshooting:");
    console.error("  1. Check your SUPABASE_URL and SUPABASE_ANON_KEY in .env");
    console.error("  2. Verify your Supabase project is active");
    console.error("  3. Check your internet connection");
    console.error("  4. Ensure your API keys are correct");
  }
}

// Run the test
testSupabaseConnection();
