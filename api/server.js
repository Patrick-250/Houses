const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const houseRoutes = require("./routes/houseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dataBase = require("./dataBase/dataBase");
dataBase();
const dotenv = require("dotenv").config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`app listening on port ${port}`);
});
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
  res.status(200).json("file uploaded succesfuly");
});
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/admin", adminRoutes);
const root = express.static(path.join(__dirname, "/images"));
app.use("/images", root);
