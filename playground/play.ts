const router = require("express").Router();
import type { NextFunction, Request, Response } from "express";
const { check, validationResult } = require("express-validator");
const upload = require("../middleware/uploadMiddleware");

router.get("/play", (req: Request, res: Response, next: NextFunction) => {
  res.render("playground/play", { title: " playground" });
});

router.post(
  "/play",
  upload.single("my-file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      console.log(req.file);
    }
    res.render("playground/play", { title: " playground" });
  },
);

module.exports = router;
