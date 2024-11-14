const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection succesful");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exits the application
  }
};

module.exports = connectDB;
