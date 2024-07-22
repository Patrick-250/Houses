const dontenv = require("dotenv").config();
const mongoose = require("mongoose");
const dataBase = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "database connected",
      connect.connection.name,
      connect.connection.host
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = dataBase;
