import type { NextFunction, Request, Response } from "express";

const express = require("express");
const morgan = require("morgan");

const app = express();

// =========== set up view engine ==========
app.set("view engine", "ejs");
app.set("views", "./views");

// =============== middle ware ============
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.json(),
  express.urlencoded({ extended: true }),
];
app.use(middleware);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
