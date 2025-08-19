// Test the combined member data functionality
import { getCombinedMemberData } from "./csvReader.js";

async function test() {
  console.log("Testing combined member data...");

  // Simulate some database members
  const databaseMembers = [
    {
      id: 1,
      name: "Test User 1",
      email: "test1@example.com",
      phone: "01234567890",
      bloodGroup: "A+",
      department: "Computer Science",
      year: "1st Year",
      motivation: "Learning",
      experience: "None",
      interests: ["Programming", "AI"],
      submittedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Test User 2",
      email: "test2@example.com",
      phone: "01234567891",
      bloodGroup: "B+",
      department: "Physics",
      year: "2nd Year",
      motivation: "Research",
      experience: "Some",
      interests: ["Physics", "Research"],
      submittedAt: new Date().toISOString(),
    },
  ];

  try {
    const result = await getCombinedMemberData(databaseMembers);

    console.log("✅ Combined data statistics:");
    console.log(`   Total members: ${result.total}`);
    console.log(`   Current members: ${result.current}`);
    console.log(`   Previous members: ${result.previous}`);

    console.log("\n📊 Sample members:");
    console.log("   Current members:");
    result.members
      .filter((m) => !m.isPreviousData)
      .slice(0, 2)
      .forEach((m) => {
        console.log(`     - ${m.name} (${m.email})`);
      });

    console.log("   Previous members:");
    result.members
      .filter((m) => m.isPreviousData)
      .slice(0, 3)
      .forEach((m) => {
        console.log(`     - ${m.name} (${m.email})`);
      });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();
