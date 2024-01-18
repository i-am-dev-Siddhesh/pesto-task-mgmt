import { NextFunction, Request, Response } from 'express';
import { prisma } from '../clients/prisma';
import { decodeJWTToken } from '../utils/auth';
import { forbiddenError, generalError } from '../utils/errorResponse';

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = process.env.API_KEY as string;
    if (!req.headers.apikey || req?.headers?.apikey !== apiKey) {
      return res.status(403).json(forbiddenError());
    }

    return next();
  } catch (error: any) {
    return res.status(500).json(generalError(error));
  }
};

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const idToken = authorization.split('Bearer ')[1];
    const decoded: any = decodeJWTToken(idToken, 'user');

    const email = decoded?.email.replace('+91', '');
    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as any;
    if (!user) {
      throw {
        message: 'User not found!!!',
      };
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(forbiddenError());
  }
};
