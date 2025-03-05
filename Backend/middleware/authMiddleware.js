import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies.jwt;
  if(!token){
    return next(
      res.status(401).json({
        message: "You are not logged in. Please log in to get access",
      })
    )
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      res.status(401).json({
        message: "Invalid token. Please log in again",
      })
    )
  }

  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    return next(
      res.status(401).json({
        message: "The user belonging to this token does no longer exist",
      })
    )
  }

  req.user = currentUser;
  next();


}