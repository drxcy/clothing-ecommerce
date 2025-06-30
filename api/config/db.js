const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
    // DO NOT exit here
  } catch (err) {
    console.error("Mongo DB connection failed", err);
    process.exit(1); // Only exit if there's an error
  }
};

module.exports = connectDB;
