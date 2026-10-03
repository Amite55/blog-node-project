import type { NextFunction, Request, Response } from "express";
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const config = require("config");

const Mongo_DB_URI = `mongodb+srv://${config.get("db-user-name")}:${config.get("db-password")}@cluster0.xbihixd.mongodb.net/blog_db`;

const setMiddleware = require("./middleware/middleware");
const setRoutes = require("./routes/route");

const app = express();

// =========== set up view engine ==========
app.set("view engine", "ejs");
app.set("views", "./views");
// ================= set up middlewares from middleware directory ==============
setMiddleware(app);
// ================= set up routes from routes directory ==============
setRoutes(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status === 404) {
    return res.render("pages/error/404", { title: "404 - Page Not Found" });
  }
});

const PORT = process.env.PORT || 3002;
// ================ connect to database ==============
mongoose
  .connect(Mongo_DB_URI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection error:", error);
  });
