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
      path.join(__dirname, "data", "primaryData"),
      path.join(__dirname, "data", "backupData"),
      path.join(__dirname, "data", "emergencyBackup"),
    ];

    // Prevent multiple simultaneous CSV reads
    this.isReading = false;
    this.lastReadTime = 0;
    this.readCooldown = 30000; // 30 seconds between reads
    this.csvReadCount = 0;
    this.maxCsvReads = 3; // Limit CSV reads per session

    // Ensure all storage locations exist
    this.storageLocations.forEach((location) => {
      if (!fs.existsSync(location)) {
        fs.mkdirSync(location, { recursive: true });
      }
    });

    console.log(
      "🏗️ Data persistence manager initialized with 3 storage locations"
    );
  }

  /**
   * Save data to multiple locations
   */
  async saveToMultipleLocations(data, filename = "members.json") {
    const dataString = JSON.stringify(data, null, 2);
    const promises = [];

    this.storageLocations.forEach((location, index) => {
      const filePath = path.join(location, filename);
      promises.push(
        fs.promises
          .writeFile(filePath, dataString)
          .then(() =>
            console.log(`✅ Data saved to location ${index + 1}: ${filePath}`)
          )
          .catch((error) =>
            console.error(`❌ Failed to save to location ${index + 1}:`, error)
          )
      );
    });

    // Also save as CSV
    if (Array.isArray(data)) {
      const csvContent = exportAllDataToCSV(data);
      this.storageLocations.forEach((location, index) => {
        const csvPath = path.join(
          location,
          `${filename.replace(".json", ".csv")}`
        );
        promises.push(
          fs.promises
            .writeFile(csvPath, csvContent)
            .then(() =>
              console.log(`📊 CSV saved to location ${index + 1}: ${csvPath}`)
            )
            .catch((error) =>
              console.error(
                `❌ Failed to save CSV to location ${index + 1}:`,
                error
              )
            )
        );
      });
    }

    await Promise.allSettled(promises);
  }

  /**
   * Load data from multiple sources with fallback
   */
  async loadFromMultipleLocations(filename = "members.json") {
    for (let i = 0; i < this.storageLocations.length; i++) {
      try {
        const filePath = path.join(this.storageLocations[i], filename);
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          console.log(`✅ Data loaded from location ${i + 1}: ${filePath}`);
          return data;
        }
      } catch (error) {
        console.error(`❌ Failed to load from location ${i + 1}:`, error);
      }
    }

    console.log("⚠️ No data found in any location, returning empty array");
    return [];
  }

  /**
   * Start automatic backup system
   */
  startAutoBackup(interval = 30 * 60 * 1000) {
    // 30 minutes default
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
    }

    this.backupInterval = setInterval(async () => {
      try {
        // Get current data from database
        const { getAllMembers } = await import("./database.js");
        const members = await getAllMembers();

        // Save to multiple locations
        await this.saveToMultipleLocations(
          members,
          `auto_backup_${Date.now()}.json`
        );

        console.log(`🔄 Auto-backup completed at ${new Date().toISOString()}`);
      } catch (error) {
        console.error("❌ Auto-backup failed:", error);
      }
    }, interval);

    console.log(
      `⏰ Auto-backup started with ${interval / 60000} minute intervals`
    );
  }

  /**
   * Stop automatic backup
   */
  stopAutoBackup() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
      console.log("⏹️ Auto-backup stopped");
    }
  }

  /**
   * Clean and validate field data
   */
  cleanField(field) {
    if (!field || typeof field !== "string") return "";
    return field
      .trim()
      .replace(/\r?\n|\r/g, " ")
      .replace(/\s+/g, " ");
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Check if CSV read is allowed
   */
  canReadCsv() {
    const now = Date.now();
    return (
      !this.isReading &&
      now - this.lastReadTime >= this.readCooldown &&
      this.csvReadCount < this.maxCsvReads
    );
  }

  /**
   * Reset CSV read count (useful for new deployments)
   */
  resetCsvReadCount() {
    this.csvReadCount = 0;
    this.lastReadTime = 0;
    this.isReading = false;
    console.log("🔄 CSV read count and locks reset");
  }

  /**
   * Force CSV read (bypass cooldown for testing)
   */
  forceCsvRead() {
    this.csvReadCount = 0;
    this.lastReadTime = 0;
    this.isReading = false;
    console.log("🔓 CSV read locks cleared for forced read");
  }

  /**
   * Force a fresh CSV read when structure changes
   */
  refreshCsvData() {
    console.log("🔄 CSV structure changed - forcing fresh read");
    this.resetCsvReadCount();
    this.forceCsvRead();
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
 * Read and parse CSV file with previous member data - IMPROVED VERSION
 */
export function readPreviousData() {
  // Check if CSV reading is allowed
  if (!persistenceManager.canReadCsv()) {
    console.log(
      `CSV read skipped - cooldown period, already reading, or max reads reached (${persistenceManager.csvReadCount}/${persistenceManager.maxCsvReads})`
    );
    return [];
  }

  persistenceManager.isReading = true;
  persistenceManager.lastReadTime = Date.now();
  persistenceManager.csvReadCount++;

  // Set a timeout to prevent getting stuck
  const timeoutId = setTimeout(() => {
    if (persistenceManager.isReading) {
      console.log("⚠️ CSV read timeout - forcing completion");
      persistenceManager.isReading = false;
    }
  }, 15000); // 15 second timeout

  try {
    const csvPath = path.join(
      __dirname,
      "data",
      "previousData",
      "memberdata.csv"
    );

    console.log(
      `🔍 CSV Read Attempt #${persistenceManager.csvReadCount} - Looking for CSV file at:`,
      csvPath
    );
    console.log("File exists:", fs.existsSync(csvPath));

    if (!fs.existsSync(csvPath)) {
      console.log("Previous data CSV file not found at:", csvPath);
      clearTimeout(timeoutId);
      persistenceManager.isReading = false;
      return [];
    }

    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const lines = csvContent.split("\n").filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      clearTimeout(timeoutId);
      persistenceManager.isReading = false;
      return [];
    }

    // Parse header row
    const headers = parseCSVLine(lines[0]);
    console.log("CSV Headers:", headers);

    // Find column indices dynamically
    const nameIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("name")
    );
    const emailIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("email")
    );
    const phoneIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("phone")
    );
    const bloodGroupIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("blood")
    );
    const departmentIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("department")
    );
    const yearIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("year")
    );
    const motivationIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("motivation")
    );
    const experienceIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("experience")
    );
    const interestsIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("interests")
    );
    const submittedAtIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("submitted")
    );

    console.log(
      `📍 Column mapping: Name[${nameIndex}], Email[${emailIndex}], Phone[${phoneIndex}]`
    );

    // Parse data rows with improved validation
    const previousMembers = [];
    let skippedRows = 0;
    let processedRows = 0;
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const validColumnCount = values.filter(
        (val) => val && val.trim() !== ""
      ).length;

      // More lenient validation - check for minimum required fields using dynamic indices
      const hasName =
        nameIndex >= 0 && values[nameIndex] && values[nameIndex].trim() !== "";
      const hasEmail =
        emailIndex >= 0 &&
        values[emailIndex] &&
        values[emailIndex].trim() !== "";
      const hasValidEmail =
        hasEmail && persistenceManager.isValidEmail(values[emailIndex]);

      // Only log first 5 problematic rows to prevent spam
      if (!hasValidEmail && i <= 5) {
        console.log(
          `Row ${i + 1}: Name="${values[nameIndex] || "N/A"}", Email="${
            values[emailIndex] || "N/A"
          }" (Valid: ${hasValidEmail})`
        );
      }

      // Accept row if it has name and valid email (minimum requirements)
      if (hasName && hasValidEmail) {
        // Normalize the data structure to match database schema
        const normalizedMember = {
          id: `prev_${i}`, // Prefix to distinguish from database IDs
          name: persistenceManager.cleanField(values[nameIndex] || ""),
          email: persistenceManager.cleanField(values[emailIndex] || ""),
          phone: persistenceManager.cleanField(values[phoneIndex] || ""),
          bloodGroup: persistenceManager.cleanField(
            values[bloodGroupIndex] || ""
          ),
          department: persistenceManager.cleanField(
            values[departmentIndex] || ""
          ),
          year: persistenceManager.cleanField(values[yearIndex] || ""),
          motivation: persistenceManager.cleanField(
            values[motivationIndex] || ""
          ),
          experience: persistenceManager.cleanField(
            values[experienceIndex] || ""
          ),
          interests: values[interestsIndex]
            ? values[interestsIndex]
                .split(";")
                .map((i) => i.trim())
                .filter((i) => i)
            : [],
          submittedAt:
            persistenceManager.cleanField(values[submittedAtIndex] || "") ||
            new Date().toISOString(),
          source: "csv", // Mark as CSV data
          isPreviousData: true,
        };

        previousMembers.push(normalizedMember);
        processedRows++;
      } else {
        skippedRows++;
        if (errors.length < 5) {
          // Collect only first 5 errors for reporting
          errors.push(
            `Row ${i + 1}: ${!hasName ? "Missing name" : ""} ${
              !hasEmail ? "Missing email" : ""
            } ${hasEmail && !hasValidEmail ? "Invalid email format" : ""}`
          );
        }
      }
    }

    console.log(`\n=== CSV Processing Summary ===`);
    console.log(`Total CSV lines: ${lines.length - 1}`);
    console.log(`Successfully processed: ${processedRows} members`);
    console.log(`Skipped due to issues: ${skippedRows} rows`);
    console.log(
      `Success rate: ${((processedRows / (lines.length - 1)) * 100).toFixed(
        1
      )}%`
    );

    if (errors.length > 0) {
      console.log("Sample validation errors:", errors);
    }

    clearTimeout(timeoutId);
    persistenceManager.isReading = false;
    return previousMembers;
  } catch (error) {
    console.error("Error reading previous data CSV:", error);
    clearTimeout(timeoutId);
    persistenceManager.isReading = false;
    return [];
  }
}

/**
 * Get combined data (database + CSV + backup sources) - IMPROVED VERSION
 */
export async function getCombinedMemberData(databaseMembers = []) {
  // Only read CSV data if allowed (prevents infinite loops)
  let previousMembers = [];
  if (persistenceManager.canReadCsv()) {
    console.log("📊 Reading CSV data for combination...");
    previousMembers = readPreviousData();
  } else {
    console.log("⏸️ CSV read skipped - using cached or backup data");
    // Try to load from backup locations instead
    try {
      const backupData = await persistenceManager.loadFromMultipleLocations(
        "previous_members_cache.json"
      );
      if (Array.isArray(backupData) && backupData.length > 0) {
        previousMembers = backupData;
        console.log(
          `📋 Loaded ${previousMembers.length} previous members from cache`
        );
      }
    } catch (error) {
      console.log("No cached previous member data available");
    }
  }

  // Also try to load from backup locations
  const backupMembers = await persistenceManager.loadFromMultipleLocations(
    "backup_members.json"
  );

  // Mark database members
  const currentMembers = databaseMembers.map((member) => ({
    ...member,
    source: "database",
    isPreviousData: false,
  }));

  // Combine all sources (remove duplicates by email)
  const allSources = [...previousMembers, ...currentMembers, ...backupMembers];
  const uniqueMembers = allSources.filter(
    (member, index, self) =>
      index === self.findIndex((m) => m.email === member.email)
  );

  // Sort by date (newest first)
  uniqueMembers.sort((a, b) => {
    const dateA = new Date(a.submittedAt || 0);
    const dateB = new Date(b.submittedAt || 0);
    return dateB - dateA;
  });

  // Save combined data to multiple locations for future recovery
  await persistenceManager.saveToMultipleLocations(
    uniqueMembers,
    "combined_members.json"
  );

  // Cache previous members for future use
  if (previousMembers.length > 0) {
    await persistenceManager.saveToMultipleLocations(
      previousMembers,
      "previous_members_cache.json"
    );
  }

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
