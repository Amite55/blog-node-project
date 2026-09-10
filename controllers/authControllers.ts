import type { NextFunction, Request, Response } from "express";
const User = require("../model/User");
import bcrypt = require("bcryptjs");

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
) => {};

exports.logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
