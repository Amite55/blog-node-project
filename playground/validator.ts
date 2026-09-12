const router = require("express").Router();
import type { NextFunction, Request, Response } from "express";
const { check } = require("express-validator");

router.get("/validator", (req: Request, res: Response, next: NextFunction) => {
  res.render("playground/signup", { title: "Validator playground" });
});

router.post(
  "/validator",
  [
    check("userName")
      .notEmpty()
      .withMessage("User name is required")
      .isLength({ min: 3 }),
    check("email").notEmpty().withMessage("Provide a valid email").isEmail(),
  ],
  (req: Request, res: Response, next: NextFunction) => {},
);

module.exports = router;
