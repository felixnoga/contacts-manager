require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conected to Atlas DB");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
