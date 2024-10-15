const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const houseRoutes = require("./routes/houseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const dataBase = require("./dataBase/dataBase");

// Load environment variables
require("dotenv").config();

// Initialize database connection
dataBase();

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file uploaded successfully");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Explicitly set MIME type for JavaScript files
app.get("*.js", (req, res, next) => {
  res.set("Content-Type", "application/javascript");
  next();
});

// Static files setup for images
const root = express.static(path.join(__dirname, "/images"));
app.use("/images", root);

// Routes setup
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/admin", adminRoutes);

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Server setup
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`app listening on port ${port}`);
});
