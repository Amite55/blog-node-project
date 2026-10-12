import type { NextFunction, Request, Response } from "express";
const User = require("../model/User");
const Profile = require("../model/profile");

exports.uploadProfileImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    try {
    } catch (error: any) {
      next(error);
    }
  }
};
