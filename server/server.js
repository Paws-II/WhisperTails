import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ message: "This is working" });
});

const startServer = async () => {
  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
