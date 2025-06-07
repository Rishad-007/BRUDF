import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  initDatabase,
  addMember,
  getAllMembers,
  deleteMember,
  closeDatabase,
} from "./database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 5000 to 3001 to avoid conflicts

// Initialize database on startup
let dbInitialized = false;

async function setupDatabase() {
  try {
    await initDatabase();
    dbInitialized = true;
    console.log("✅ Database initialized successfully");
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

    const members = await getAllMembers();

    res.json({
      success: true,
      members: members,
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

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
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

  process.on("SIGINT", async () => {
    console.log("🔄 Received SIGINT, shutting down gracefully...");
    await closeDatabase();
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
