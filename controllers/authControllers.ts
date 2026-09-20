import type { NextFunction, Request, Response } from "express";
const User = require("../model/User");
import bcrypt = require("bcryptjs");
import errorFormatter = require("../utils/ValidationErrorFormator");
const { validationResult } = require("express-validator");

// ================= get signup controller ==================
exports.signupGetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.render("pages/auth/signup", {
    title: "Create a new account",
    error: {},
    value: {},
  });
};
// ==================  signup post controller ==================
exports.signupPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { userName, email, password, phone, confirmPassword } = req.body;
  // ================ error formatter ==============
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/signup", {
      title: "Create a new account",
      error: errors.mapped(),
      value: { userName, email, phone },
    });
  }
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
// ================== get login controller ==================
exports.loginGetController = async (req: Request, res: Response) => {
  res.render("pages/auth/login", {
    title: "Log in to your  account",
    error: {},
  });
};

exports.loginPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { email, password } = req.body;

  // ================ error formatter ==============
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/login", {
      title: "Log in to your  account",
      error: errors.mapped(),
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }
    // ========== compare password ==========
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials" });
    }
    //  [=========== set session ==========]
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id.toString(),
      userName: user.userName,
      email: user.email,
    };

    res.render("pages/auth/login", {
      title: "Log in to your  account",
      error: {},
    });
  } catch (error) {
    console.log(error, "error in login controller");
    next(error);
  }
};

exports.logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
