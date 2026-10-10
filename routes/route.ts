const authRoutes = require("./authRoute");
const dashboardRoutes = require("./dashboardRoutes");
import type { NextFunction, Request, Response } from "express";
const playgroundRoutes = require("../playground/play");

const routes = [
  {
    path: "/auth",
    handler: authRoutes,
  },
  {
    path: "/dashboard",
    handler: dashboardRoutes,
  },
  {
    path: "/playground",
    handler: playgroundRoutes,
  },
  {
    path: "/",
    handler: (req: Request, res: Response) => {
      res.json({ message: "Hello, New blog full stack site " });
    },
  },
];

module.exports = (app: any) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
