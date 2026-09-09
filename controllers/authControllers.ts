import type { NextFunction, Request, Response } from "express";

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
) => {};

exports.loginGetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
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
