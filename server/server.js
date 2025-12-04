import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "This is working" });
});

app.listen(8000, () => {
  console.log("Server is running");
});
