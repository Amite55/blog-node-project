import type { NextFunction, Request, Response } from "express";
const Profile = require("../model/profile");

exports.getDashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.render("pages/dashboard/dashboard", { title: "Dashboard" });
    }
    res.redirect("/dashboard/create-profile");
  } catch (error: any) {
    next(error);
  }
};

exports.createProfileGetProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-profile");
    }
    res.render("pages/dashboard/createProfile", { title: "Create Profile" });
  } catch (error: any) {
    next(error);
  }
};

exports.createProfilePostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

exports.editProfileGetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

exports.editProfilePostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};
