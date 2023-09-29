/** @format */

import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.middleware.js";
import UserModel from "../models/user.model.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Missing required key",
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchPassword) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const jwtPayLoad = {
      email: existingUser.email,
      id: existingUser.id,
      fullname: existingUser.fullname,
    };
    const token = jwt.sign(jwtPayLoad, process.env.SECRET_KEY);

    res.json({
      user: jwtPayLoad,
      accessToken: token,
      message: "Login succesfully",
    });
  
 
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/register", async (req, res) => {
  const { email, fullname, password } = req.body;
  if (!email || !fullname || !password) {
    return res.status(400).json({
      message: "Missing required key",
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User has already existed",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email,
      fullname,
      password: hashedPassword,
    });

    newUser.save();

    res.status(201).json({
      message: "register user successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.get("/me", authMiddleware, async (req, res) => {
  const { id } = req.user;
  const currentUser = await UserModel.findById(id).select("-password");
  res.json({
    userInfo: currentUser,
  });
});

export default authRouter;
