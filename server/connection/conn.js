import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DataBase connected successfully....");
  console.log("======================================");
});

db.on("disconnected", () => {
  console.log("DataBase disconnected");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

export default db;
