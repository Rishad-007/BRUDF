/**
 * Check Missing Members Script
 * Compares SQLite and Supabase to find missing members
 */

import dotenv from "dotenv";
import DatabaseAdapter from "../databaseAdapter.js";
import { DB_PROVIDERS } from "../databaseConfig.js";

dotenv.config();

async function checkMissingMembers() {
  console.log("🔍 Checking for missing members...");

  let sqliteAdapter = null;
  let supabaseAdapter = null;

  try {
    // Setup SQLite adapter
    process.env.DB_PROVIDER = DB_PROVIDERS.SQLITE;
    sqliteAdapter = new DatabaseAdapter();
    await sqliteAdapter.initialize();

    // Setup Supabase adapter
    process.env.DB_PROVIDER = DB_PROVIDERS.SUPABASE;
    supabaseAdapter = new DatabaseAdapter();
    await supabaseAdapter.initialize();

    // Get all members from both databases
    console.log("📖 Reading from SQLite...");
    const sqliteMembers = await sqliteAdapter.getAllMembers();

    console.log("📖 Reading from Supabase...");
    const supabaseMembers = await supabaseAdapter.getAllMembers();

    console.log(`📊 SQLite: ${sqliteMembers.length} members`);
    console.log(`📊 Supabase: ${supabaseMembers.length} members`);

    // Find missing members
    const supabaseEmails = new Set(supabaseMembers.map((m) => m.email));
    const missingMembers = sqliteMembers.filter(
      (m) => !supabaseEmails.has(m.email)
    );

    console.log(`\\n❌ Missing ${missingMembers.length} members in Supabase:`);

    if (missingMembers.length > 0) {
      missingMembers.forEach((member, index) => {
        console.log(`${index + 1}. ${member.name} (${member.email})`);
        console.log(`   Phone: ${member.phone}`);
        console.log(`   Department: ${member.department} - ${member.year}`);
        console.log("");
      });

      console.log("\\n🔧 To add these members manually:");
      console.log(
        "1. Run: npm run db:migrate migrate supabase (will retry failed ones)"
      );
      console.log("2. Or use the admin panel to add them manually");
      console.log("3. Or fix the data and run migration again");
    } else {
      console.log("🎉 All members successfully migrated!");
    }
  } catch (error) {
    console.error("❌ Error checking missing members:", error);
  } finally {
    if (sqliteAdapter) await sqliteAdapter.close();
    if (supabaseAdapter) await supabaseAdapter.close();
  }
}

checkMissingMembers();
