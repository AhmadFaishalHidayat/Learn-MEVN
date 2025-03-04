import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

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

export default class registerUser {
  static async registerUser(req, res) {
    try {
      const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      createSendToken(createUser, 201, res);
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Register User Failed",
          error:
            error.errors.name || error.errors.email || error.errors.password,
        });
      }
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
  static async loginUser(req, res) {
    try {
      res.status(200).json({ message: "Login User Done" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
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
