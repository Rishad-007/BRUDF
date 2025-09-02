import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Multi-source data persistence manager
 */
export class DataPersistenceManager {
  constructor() {
    this.backupInterval = null;
    this.storageLocations = [
      path.join(__dirname, 'data', 'primaryData'),
      path.join(__dirname, 'data', 'backupData'),
      path.join(__dirname, 'data', 'emergencyBackup')
    ];
    
    // Ensure all storage locations exist
    this.storageLocations.forEach(location => {
      if (!fs.existsSync(location)) {
        fs.mkdirSync(location, { recursive: true });
      }
    });
    
    console.log("🏗️ Data persistence manager initialized with 3 storage locations");
  }

  /**
   * Save data to multiple locations
   */
  async saveToMultipleLocations(data, filename = 'members.json') {
    const dataString = JSON.stringify(data, null, 2);
    const promises = [];

    this.storageLocations.forEach((location, index) => {
      const filePath = path.join(location, filename);
      promises.push(
        fs.promises.writeFile(filePath, dataString)
          .then(() => console.log(`✅ Data saved to location ${index + 1}: ${filePath}`))
          .catch(error => console.error(`❌ Failed to save to location ${index + 1}:`, error))
      );
    });

    // Also save as CSV
    if (Array.isArray(data)) {
      const csvContent = exportAllDataToCSV(data);
      this.storageLocations.forEach((location, index) => {
        const csvPath = path.join(location, `${filename.replace('.json', '.csv')}`);
        promises.push(
          fs.promises.writeFile(csvPath, csvContent)
            .then(() => console.log(`📊 CSV saved to location ${index + 1}: ${csvPath}`))
            .catch(error => console.error(`❌ Failed to save CSV to location ${index + 1}:`, error))
        );
      });
    }

    await Promise.allSettled(promises);
  }

  /**
   * Load data from multiple sources with fallback
   */
  async loadFromMultipleLocations(filename = 'members.json') {
    for (let i = 0; i < this.storageLocations.length; i++) {
      try {
        const filePath = path.join(this.storageLocations[i], filename);
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          console.log(`✅ Data loaded from location ${i + 1}: ${filePath}`);
          return data;
        }
      } catch (error) {
        console.error(`❌ Failed to load from location ${i + 1}:`, error);
      }
    }
    
    console.log('⚠️ No data found in any location, returning empty array');
    return [];
  }

  /**
   * Start automatic backup system
   */
  startAutoBackup(interval = 30 * 60 * 1000) { // 30 minutes default
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
    }

    this.backupInterval = setInterval(async () => {
      try {
        // Get current data from database
        const { getAllMembers } = await import('./database.js');
        const members = await getAllMembers();
        
        // Save to multiple locations
        await this.saveToMultipleLocations(members, `auto_backup_${Date.now()}.json`);
        
        console.log(`🔄 Auto-backup completed at ${new Date().toISOString()}`);
      } catch (error) {
        console.error('❌ Auto-backup failed:', error);
      }
    }, interval);

    console.log(`⏰ Auto-backup started with ${interval / 60000} minute intervals`);
  }

  /**
   * Stop automatic backup
   */
  stopAutoBackup() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
      console.log('⏹️ Auto-backup stopped');
    }
  }
}

// Create singleton instance
export const persistenceManager = new DataPersistenceManager();

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
    const csvPath = path.join(
      __dirname,
      "data",
      "previousData",
      "memberdata.csv"
    );

    console.log("Looking for CSV file at:", csvPath);
    console.log("File exists:", fs.existsSync(csvPath));

    if (!fs.existsSync(csvPath)) {
      console.log("Previous data CSV file not found at:", csvPath);
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
 * Get combined data (database + CSV + backup sources)
 */
export async function getCombinedMemberData(databaseMembers = []) {
  const previousMembers = readPreviousData();
  
  // Also try to load from backup locations
  const backupMembers = await persistenceManager.loadFromMultipleLocations('backup_members.json');

  // Mark database members
  const currentMembers = databaseMembers.map((member) => ({
    ...member,
    source: "database",
    isPreviousData: false,
  }));

  // Combine all sources (remove duplicates by email)
  const allSources = [...previousMembers, ...currentMembers, ...backupMembers];
  const uniqueMembers = allSources.filter((member, index, self) => 
    index === self.findIndex(m => m.email === member.email)
  );

  // Sort by date (newest first)
  uniqueMembers.sort((a, b) => {
    const dateA = new Date(a.submittedAt);
    const dateB = new Date(b.submittedAt);
    return dateB - dateA;
  });

  // Save combined data to multiple locations for future recovery
  await persistenceManager.saveToMultipleLocations(uniqueMembers, 'combined_members.json');

  return {
    total: uniqueMembers.length,
    current: currentMembers.length,
    previous: previousMembers.length,
    backup: backupMembers.length,
    members: uniqueMembers,
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
