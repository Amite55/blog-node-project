import type { NextFunction, Request, Response } from "express";

const express = require("express");
const morgan = require("morgan");

// ============= imports routes ==============
const authRoutes = require("./routes/authRoute");

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
// ========== middle ware uses ===========
app.use(middleware);

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, New blog full stack site " });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
