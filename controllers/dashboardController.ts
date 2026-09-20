import type { NextFunction, Request, Response } from "express";

exports.getDashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.render("pages/dashboard/dashboard", { title: "Dashboard" });
};
