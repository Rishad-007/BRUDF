import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  initDatabase,
  addMember,
  getAllMembers,
  deleteMember,
  closeDatabase,
  createDatabaseBackup,
} from "./databaseAdapter.js";
import {
  getCombinedMemberData,
  exportAllDataToCSV,
  persistenceManager,
} from "./csvReader.js";
import config from "./config.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 5000 to 3001 to avoid conflicts

// Initialize database on startup
let dbInitialized = false;
let membersCache = null;
let cacheLastUpdated = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Helper function to get cached or fresh member data
async function getCachedMemberData() {
  const now = Date.now();

  // Return cached data if still valid
  if (membersCache && now - cacheLastUpdated < CACHE_DURATION) {
    console.log("📋 Returning cached member data");
    return membersCache;
  }

  // Get fresh data
  console.log("🔄 Refreshing member data cache");
  const databaseMembers = await getAllMembers();
  const combinedData = await getCombinedMemberData(databaseMembers);

  // Update cache
  membersCache = combinedData;
  cacheLastUpdated = now;

  return combinedData;
}

async function setupDatabase() {
  try {
    await initDatabase();
    dbInitialized = true;
    console.log("✅ Multi-layer database initialized successfully");

    // Read CSV data ONCE on startup only
    console.log("🔄 Initializing data sources...");

    // Reset CSV reading limits since structure may have changed
    const { readPreviousData, persistenceManager } = await import(
      "./csvReader.js"
    );
    persistenceManager.refreshCsvData(); // Reset limits for fresh read

    const csvData = readPreviousData();

    if (csvData.length > 0) {
      console.log(
        `📊 Processing ${csvData.length} CSV records for database import...`
      );

      let importedCount = 0;
      for (const member of csvData) {
        try {
          // Try to add member, skip if email already exists
          await addMember({
            name: member.name,
            email: member.email,
            phone: member.phone,
            bloodGroup: member.bloodGroup,
            department: member.department,
            year: member.year,
            motivation: member.motivation,
            experience: member.experience,
            interests: member.interests || [],
          });
          importedCount++;
        } catch (error) {
          // Ignore duplicate entries
          if (!error.message.includes("email already exists")) {
            console.error("Error importing CSV member:", error.message);
          }
        }
      }
      console.log(
        `✅ Imported ${importedCount} new members from CSV to database`
      );
    }

    // Start comprehensive backup system
    persistenceManager.startAutoBackup();

    // Initial data preservation
    const members = await getAllMembers();
    await persistenceManager.saveToMultipleLocations(
      members,
      "initial_backup.json"
    );

    console.log("🛡️ Multi-layer data protection activated");
    console.log(`💾 Total members in database: ${members.length}`);
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
    process.exit(1);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory (for images)
app.use(express.static(path.join(__dirname, "../public")));

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, "../dist")));

// API Routes
// Submit membership form
app.post("/api/members", async (req, res) => {
  try {
    if (!dbInitialized) {
      return res.status(500).json({
        success: false,
        message: "Database not initialized",
      });
    }

    const memberData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      bloodGroup: req.body.bloodGroup,
      department: req.body.department,
      year: req.body.year,
      motivation: req.body.motivation,
      experience: req.body.experience,
      interests: req.body.interests || [],
    };

    const newMember = await addMember(memberData);

    // Invalidate cache when new member is added
    membersCache = null;
    console.log("🔄 Cache invalidated due to new member addition");

    res.status(201).json({
      success: true,
      message: "Membership application submitted successfully",
      id: newMember.id,
    });
  } catch (error) {
    if (error.message === "A member with this email already exists") {
      res.status(400).json({
        success: false,
        message: "A member with this email already exists",
      });
    } else {
      console.error("Error adding member:", error);
      res.status(500).json({
        success: false,
        message: "Failed to submit application",
      });
    }
  }
});

// Get all members (admin only - simple password protection)
app.get("/api/members", async (req, res) => {
  try {
    const { password } = req.query;

    // Simple password protection (in production, use proper authentication)
    if (
      password !== process.env.ADMIN_PASSWORD &&
      password !== "brudf2024admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!dbInitialized) {
      return res.status(500).json({
        success: false,
        message: "Database not initialized",
      });
    }

    // Get combined data (database + CSV) with caching
    const combinedData = await getCachedMemberData();

    res.json({
      success: true,
      members: combinedData.members,
      stats: {
        total: combinedData.total,
        current: combinedData.current,
        previous: combinedData.previous,
      },
    });
  } catch (error) {
    console.error("Error getting members:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve members",
    });
  }
});

// Delete member (admin only)
app.delete("/api/members/:id", async (req, res) => {
  try {
    const { password } = req.query;
    const { id } = req.params;

    if (
      password !== process.env.ADMIN_PASSWORD &&
      password !== "brudf2024admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!dbInitialized) {
      return res.status(500).json({
        success: false,
        message: "Database not initialized",
      });
    }

    // Only allow deletion of current database members (not CSV data)
    if (id.toString().startsWith("prev_")) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete previous data entries",
      });
    }

    const deleted = await deleteMember(parseInt(id));

    if (deleted) {
      res.json({
        success: true,
        message: "Member deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete member",
    });
  }
});

// Export all members as CSV (admin only)
app.get("/api/members/export", async (req, res) => {
  try {
    const { password } = req.query;

    if (
      password !== process.env.ADMIN_PASSWORD &&
      password !== "brudf2024admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (!dbInitialized) {
      return res.status(500).json({
        success: false,
        message: "Database not initialized",
      });
    }

    // Get combined data (database + CSV) with caching
    const combinedData = await getCachedMemberData();

    // Generate CSV content
    const csvContent = exportAllDataToCSV(combinedData.members);

    // Set appropriate headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="brudf-all-members-${
        new Date().toISOString().split("T")[0]
      }.csv"`
    );

    res.send(csvContent);
  } catch (error) {
    console.error("Error exporting members:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export members",
    });
  }
});

// Certificate validation endpoint
app.post("/api/validate-certificate", (req, res) => {
  try {
    const { certificateCode } = req.body;

    if (!certificateCode) {
      return res.status(400).json({
        success: false,
        message: "Certificate code is required",
      });
    }

    // Read the certificate validation file
    const certificateFilePath = path.join(
      __dirname,
      "certificateValidation.txt"
    );

    if (!fs.existsSync(certificateFilePath)) {
      return res.status(500).json({
        success: false,
        message: "Certificate validation file not found",
      });
    }

    const validCertificates = fs
      .readFileSync(certificateFilePath, "utf8")
      .split("\n")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const isValid = validCertificates.includes(certificateCode.trim());

    res.json({
      success: true,
      valid: isValid,
      message: isValid
        ? "Certificate is valid and verified!"
        : "Certificate code not found. Please check your certificate code.",
    });
  } catch (error) {
    console.error("Error validating certificate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to validate certificate",
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Certificate validation endpoint
app.post("/api/validate-certificate", (req, res) => {
  const { certificate } = req.body;

  // For simplicity, assume certificate is a plain text (in reality, it would be more complex)
  if (!certificate) {
    return res.status(400).json({
      success: false,
      message: "No certificate provided",
    });
  }

  // Here, you would add logic to validate the certificate (e.g., check signature, expiration, etc.)
  // For this example, let's assume all certificates are valid if not empty
  const isValid = certificate.trim() !== "";

  res.json({
    success: true,
    valid: isValid,
  });
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Initialize database and start server
async function startServer() {
  await setupDatabase();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 Admin Panel: Ctrl+Shift+A or click "Admin" in footer`);
    console.log(`🔑 Admin Password: brudf2024admin`);
    console.log(`💾 Database: SQLite (persistent storage enabled)`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(
        `❌ Port ${PORT} is already in use. Trying port ${PORT + 1}...`
      );
      server.listen(PORT + 1);
    } else {
      console.error("❌ Server error:", err);
    }
  });

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("🔄 Received SIGTERM, shutting down gracefully...");
    await closeDatabase();
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });

  // Graceful shutdown with comprehensive data backup
  process.on("SIGINT", async () => {
    console.log("🔄 Received SIGINT, shutting down gracefully...");
    await performShutdownBackup();
    await closeDatabase();
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });

  process.on("SIGTERM", async () => {
    console.log("🛑 Received SIGTERM, performing graceful shutdown...");
    await performShutdownBackup();
    await closeDatabase();
    process.exit(0);
  });
}

/**
 * Perform comprehensive backup before shutdown
 */
async function performShutdownBackup() {
  try {
    console.log("💾 Creating final backup before shutdown...");

    // Get all current data
    const members = await getAllMembers();

    // Save to multiple locations
    await persistenceManager.saveToMultipleLocations(
      members,
      `shutdown_backup_${Date.now()}.json`
    );

    // Create database backup
    await createDatabaseBackup();

    // Stop auto-backup
    persistenceManager.stopAutoBackup();

    console.log("✅ Final backup completed successfully");
  } catch (error) {
    console.error("❌ Error during shutdown backup:", error);
  }
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
