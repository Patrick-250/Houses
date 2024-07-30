const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const houseRoutes = require("./routes/houseRoutes");
const dataBase = require("./dataBase/dataBase");
dataBase();
const dontenv = require("dotenv").config();
const app = express();
app.use(cors());
const port = process.env.PORT || 9001;
app.listen(port, '0.0.0.0', () => {
  console.log(`app listening on port ${port}`);
});``
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/houses", houseRoutes);
