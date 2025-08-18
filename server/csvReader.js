import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse CSV line with proper handling of quoted fields
 */
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === "," && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = "";
      i++;
    } else {
      current += char;
      i++;
    }
  }

  // Add the last field
  result.push(current.trim());
  return result;
}

/**
 * Read and parse CSV file with previous member data
 */
export function readPreviousData() {
  try {
    const csvPath = path.join(__dirname, "data", "previousData", "brudf-members-2025-08-18.csv");

    if (!fs.existsSync(csvPath)) {
      console.log("Previous data CSV file not found");
      return [];
    }

    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const lines = csvContent.split("\n").filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return [];
    }

    // Parse header row
    const headers = parseCSVLine(lines[0]);
    console.log("CSV Headers:", headers);

    // Parse data rows
    const previousMembers = [];
    let skippedRows = 0;

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);

      // Debug logging for problematic rows
      if (values.length < headers.length) {
        console.log(
          `Row ${i}: Expected ${headers.length} columns, got ${values.length}`
        );
        skippedRows++;
      }

      if (values.length >= headers.length || values.length >= 3) {
        // More lenient check
        const member = {};
        headers.forEach((header, index) => {
          member[header] = values[index] || "";
        });

        // Skip rows with empty name or email
        if (!member["Name"] || !member["Email"]) {
          console.log(`Skipping row ${i}: Missing name or email`);
          skippedRows++;
          continue;
        }

        // Normalize the data structure to match database schema
        const normalizedMember = {
          id: `prev_${i}`, // Prefix to distinguish from database IDs
          name: member["Name"] || "",
          email: member["Email"] || "",
          phone: member["Phone"] || "",
          bloodGroup: member["Blood Group"] || "",
          department: member["Department"] || "",
          year: member["Year"] || "",
          motivation: member["Motivation"] || "",
          experience: member["Experience"] || "",
          interests: member["Interests"]
            ? member["Interests"].split(";").map((i) => i.trim())
            : [],
          submittedAt: member["Submitted At"] || "",
          source: "csv", // Mark as CSV data
          isPreviousData: true,
        };

        previousMembers.push(normalizedMember);
      }
    }

    console.log(`Total CSV lines: ${lines.length - 1}`);
    console.log(`Loaded ${previousMembers.length} previous members from CSV`);
    console.log(`Skipped ${skippedRows} rows due to formatting issues`);
    return previousMembers;
  } catch (error) {
    console.error("Error reading previous data CSV:", error);
    return [];
  }
}

/**
 * Get combined data (database + CSV)
 */
export async function getCombinedMemberData(databaseMembers = []) {
  const previousMembers = readPreviousData();

  // Mark database members
  const currentMembers = databaseMembers.map((member) => ({
    ...member,
    source: "database",
    isPreviousData: false,
  }));

  // Combine and sort by submission date
  const allMembers = [...previousMembers, ...currentMembers];

  // Sort by date (newest first)
  allMembers.sort((a, b) => {
    const dateA = new Date(a.submittedAt);
    const dateB = new Date(b.submittedAt);
    return dateB - dateA;
  });

  return {
    total: allMembers.length,
    current: currentMembers.length,
    previous: previousMembers.length,
    members: allMembers,
  };
}

/**
 * Export all data to CSV (current + previous)
 */
export function exportAllDataToCSV(allMembers) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Blood Group",
    "Department",
    "Year",
    "Motivation",
    "Experience",
    "Interests",
    "Submitted At",
    "Source",
  ];

  const csvContent = [
    headers.join(","),
    ...allMembers.map((member) =>
      [
        `"${member.name || ""}"`,
        `"${member.email || ""}"`,
        `"${member.phone || ""}"`,
        `"${member.bloodGroup || ""}"`,
        `"${member.department || ""}"`,
        `"${member.year || ""}"`,
        `"${(member.motivation || "").replace(/"/g, '""')}"`,
        `"${(member.experience || "").replace(/"/g, '""')}"`,
        `"${
          Array.isArray(member.interests)
            ? member.interests.join("; ")
            : member.interests || ""
        }"`,
        `"${member.submittedAt || ""}"`,
        `"${member.source || "unknown"}"`,
      ].join(",")
    ),
  ].join("\n");

  return csvContent;
}
