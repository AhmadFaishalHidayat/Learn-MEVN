import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(cors());

//connection mongodb
mongoose.connect(process.env.db, {}).then(() => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Message dari Express",
  });
});

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
});
