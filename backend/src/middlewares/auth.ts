import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../errors/not-authorized-error';
import { JWT_SECRET } from '../constants';

export default (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new NotAuthorizedError());
  }

  try {
    const payload = jwt.verify(accessToken, JWT_SECRET as string) as {
      id: string;
    };
    res.locals.user = payload;
    next();
  } catch {
    next(new NotAuthorizedError());
  }
};
