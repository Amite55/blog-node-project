import type { NextFunction, Request, Response } from "express";
const User = require("../model/User");
const Profile = require("../model/profile");

exports.uploadProfileImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file) {
    try {
      const profile = await Profile.findOne({ user: req.user._id });
      const profileImagePath = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profileImage: { profileImagePath } } },
        );
      } else {
        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { profileImage: { profileImagePath } } },
        );
        res.status(200).json({
          profileImagePath,
          message: "Profile image uploaded successfully",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        profileImage: req.user.profileImage,
      });
    }
  } else {
    res.status(500).json({
      profileImage: req.user.profileImage,
    });
  }
};
