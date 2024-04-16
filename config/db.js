const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.DB_URL);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connect;
