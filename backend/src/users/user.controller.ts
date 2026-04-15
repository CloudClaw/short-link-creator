import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

import User from './user.model';
import { transformError } from '../helpers/transform-error';
import BadRequestError from '../errors/bad-request-error';
import { ERROR_CODES, MAX_COOKIE_AGE, NODE_ENV } from '../constants';
import Conflict from '../errors/conflict-error';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });

    const accessToken = newUser.generateAcessToken();

    res
      .status(201)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        maxAge: MAX_COOKIE_AGE,
      })
      .send({ id: newUser._id });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);

      return next(new BadRequestError(errors[0].message));
    }

    if ((error as Error).message.includes(ERROR_CODES.unique)) {
      return next(new Conflict('Email already exists'));
    }

    next(error);
  }
};

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const accessToken = user.generateAcessToken();

    res
      .status(201)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        maxAge: MAX_COOKIE_AGE,
      })
      .send({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res
    .clearCookie('accessToken', {
      httpOnly: true,
    })
    .json({ message: 'ok' });
};
