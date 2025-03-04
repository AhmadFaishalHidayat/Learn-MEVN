import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
}

//connection mongodb
mongoose.connect(process.env.db, {}).then(() => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Message dari Express",
  });
});

//Parent Router
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
});
