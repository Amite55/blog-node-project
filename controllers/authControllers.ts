import type { NextFunction, Request, Response } from "express";
const User = require("../model/User");
import bcrypt = require("bcryptjs");
import errorFormatter = require("../utils/ValidationErrorFormator");
const { validationResult } = require("express-validator");

exports.signupGetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.render("pages/auth/signup", { title: "Create a new account" });
};
exports.signupPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // ================ error formatter ==============
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return console.log(errors.mapped());
  }

  let { userName, email, password, phone, confirmPassword } = req.body;
  try {
    // ============= hash password ==============
    const hashedPassword = await bcrypt.hashSync(password, 10);
    let user = new User({
      userName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phone,
    });
    await user.save();
    res.render("pages/auth/signup", { title: "Create a new account" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginGetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.render("pages/auth/login", { title: "Log in to your  account" });
};
exports.loginPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }
    // ========== compare password ==========
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials" });
    }
    console.log("successfully login", user);
    res.render("pages/auth/login", { title: "Log in to your  account" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
