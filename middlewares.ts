import { NextFunction, Request, Response } from 'express';

export function auth (req: Request, res: Response, next: NextFunction) {
  if (!req.session?.email) {
    return res.status(401).json("You must login")
  }
 next();
}