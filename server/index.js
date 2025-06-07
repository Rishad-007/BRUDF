import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 5000 to 3001 to avoid conflicts

// In-memory storage (for simplicity - in production, use a proper database)
let members = [];
let nextId = 1;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, "../dist")));

// API Routes
// Submit membership form
app.post("/api/members", (req, res) => {
  try {
    const memberData = {
      id: nextId++,
      ...req.body,
      submittedAt: new Date().toISOString(),
    };

    members.push(memberData);

    res.status(201).json({
      success: true,
      message: "Membership application submitted successfully",
      id: memberData.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
});

// Get all members (admin only - simple password protection)
app.get("/api/members", (req, res) => {
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

  res.json({
    success: true,
    members: members.sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    ),
  });
});

// Delete member (admin only)
app.delete("/api/members/:id", (req, res) => {
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

  members = members.filter((member) => member.id !== parseInt(id));

  res.json({
    success: true,
    message: "Member deleted successfully",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 Admin Panel: Ctrl+Shift+A or click "Admin" in footer`);
  console.log(`🔑 Admin Password: brudf2024admin`);
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
