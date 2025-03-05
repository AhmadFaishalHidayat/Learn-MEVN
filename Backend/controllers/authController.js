import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import e from "express";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiesOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: false,
  };

  res.cookie("jwt", token, cookiesOption);
  user.password = undefined;
  res.status(statusCode).json({
    data: {
      user,
    },
  });
};

export default class authController {
  static registerUser = asyncHandler(async (req, res) => {
    const createUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log("Create User Done");
    createSendToken(createUser, 201, res);
  });

  static loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log("User", user);
    if (user && (await user.comparePassword(password))) {
      createSendToken(user, 200, res);
    } else {
      throw new Error("Invalid email or password");
    }
  });

  static async logoutUser(req, res) {
    try {
      res.status(200).json({ message: "Logout User Done" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUser(req, res) {
    try {
      res.status(200).json({ message: "Get User Done" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
