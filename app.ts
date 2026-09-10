import type { NextFunction, Request, Response } from "express";

const mongoose = require("mongoose");
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
// ================ connect to database ==============
mongoose
  .connect(
    "mongodb+srv://madhob15820sparktech_db_user:D0VHFTII4fiEYYGs@cluster0.xbihixd.mongodb.net/blog_db",
  )
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection error:", error);
  });
