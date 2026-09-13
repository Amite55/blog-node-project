const router = require("express").Router();
import type { NextFunction, Request, Response } from "express";
const { check, validationResult } = require("express-validator");

router.get("/validator", (req: Request, res: Response, next: NextFunction) => {
  res.render("playground/signup", { title: "Validator playground" });
});

router.post(
  "/validator",
  [
    check("userName")
      .notEmpty()
      .withMessage("User name is required")
      .isLength({ min: 2 })
      .trim(),
    check("email").notEmpty().withMessage("Provide a valid email").isEmail(),
    check("password").custom((value: any) => {
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true;
    }),
    check("confirmPassword").custom((value: any, { req }: { req: Request }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
    }),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const formatterErrors = (error: any) => error.msg;

    console.log(errors.formatWith(formatterErrors).mapped());
    res.render("playground/signup", { title: "Validator playground" });
  },
);

module.exports = router;
