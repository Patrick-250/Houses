const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const dataBase = async () => {
  const connectionString = process.env.CONNECTION_STRING;

  if (!connectionString) {
    console.error('CONNECTION_STRING is not defined in the environment variables');
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "connected to houses database",
      connect.connection.name,
      connect.connection.host
    );
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = dataBase;