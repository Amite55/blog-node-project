import type { NextFunction, Request, Response } from "express";

const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MongoDBURI =
  process.env.MONGODBURI ||
  "mongodb+srv://madhob15820sparktech_db_user:D0VHFTII4fiEYYGs@cluster0.xbihixd.mongodb.net/blog_db";

// ============= imports routes ==============
const authRoutes = require("./routes/authRoute");
// ========== set up session store ==========
const store = new MongoDBStore({
  uri: MongoDBURI,
  collection: "sessions",
  expiration: 1000 * 60 * 60 * 24, // 1 day
});
const app = express();

// =========== set up view engine ==========
app.set("view engine", "ejs");
app.set("views", "./views");

// =============== middle ware ============
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day ====
    },
  }),
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
  .connect(MongoDBURI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection error:", error);
  });
