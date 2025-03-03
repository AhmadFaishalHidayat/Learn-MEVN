import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

//connection mongodb
mongoose.connect(process.env.db, {}).then(() => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
});
