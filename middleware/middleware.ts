const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const config = require("config");
const MongoDBStore = require("connect-mongodb-session")(session);

const Mongo_DB_URI = `mongodb+srv://${config.get("db-user-name")}:${config.get("db-password")}@cluster0.xbihixd.mongodb.net/blog_db`;

// ========== set up session store ==========
const store = new MongoDBStore({
  uri: Mongo_DB_URI,
  collection: "sessions",
  expiration: 1000 * 60 * 60 * 24, // 1 day
});

// ================= imports middlewares ==============
const { authMiddleware } = require("./authMiddleware");
const setLocals = require("./setLocals");

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
  authMiddleware,
  setLocals(),
];

module.exports = (app: any) => {
  middleware.forEach((mw) => {
    app.use(mw);
  });
};
