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
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";
    const createUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role,
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
      console.log("User", user);
      createSendToken(user, 200, res);
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  });

  static async logoutUser(req, res) {
    res.cookie("jwt", "", {
      expires: new Date(0),
      httpOnly: true,
      security: false
    });
    res.status(200).json({
      message: "Logged out",
    });
  }

  static async getUser(req, res) {
    const user = await User.findById(req.user.id).select({ password: 0 });
    if (user) {
      return res.status(200).json({
        data: {
          user,
        },
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  }
}
