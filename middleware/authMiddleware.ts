import type { NextFunction, Request, Response } from "express";
const User = require("../model/User");

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.isLoggedIn) {
    return next();
  }

  try {
    const user = await User.findById(req?.session?.user?.id);
    if (!user) {
      return next(new Error("User not found"));
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log(error, " auth middleware error");
    return next(error);
  }
};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.isLoggedIn) {
    return res.redirect("/auth/login");
  }
  next();
};

module.exports = { authMiddleware, isAuthenticated };
