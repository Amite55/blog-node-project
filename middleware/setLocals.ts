import type { NextFunction, Request, Response } from "express";

module.exports = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    res.locals.isLoggedIn = req.session?.isLoggedIn;
    return next();
  };
};
