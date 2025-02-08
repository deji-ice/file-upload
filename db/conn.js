import mongoose from "mongoose";
import dotenv from "dotenv";
// Load env variables from .env file by calling dotenv.config()
dotenv.config();

const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    // Connect to MongoDB using mongoose.connect() method accepts only one argument, the connection string
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
