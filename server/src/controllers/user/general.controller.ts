import argon2 from 'argon2';
import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import { deleteObjectFromS3, uploadToS3 } from '../../clients/s3';
import { USER_MISSING } from '../../constants/messages';
import { createJWTToken, decodeJWTToken } from '../../utils/auth';
import { generalError } from '../../utils/errorResponse';

// @desc    User sign up
// @route   POST /v1/user/auth/signup
// @access  Public
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExistingUser) {
      throw {
        statusCode: 409,
        message: 'User already exists',
      };
    }
    const passwordHash = await argon2.hash(password);

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });

    await prisma.task.create({
      data: {
        userId: createdUser.id,
      },
    });

    const { token, expirationTime } = createJWTToken(
      { id: createdUser.id, email: createdUser.email },
      'user'
    );

    return res.json({
      success: true,
      message: 'Registration successful',
      data: createdUser,
      token,
      expirationTime,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    User sign in
// @route   POST /v1/user/auth/signin
// @access  Public
export const userSignin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isExistingUser) {
      throw {
        message: 'Login Failed',
      };
    }
    const passwordHash = isExistingUser.password;
    const passwordMatches = await argon2.verify(passwordHash, password);
    if (!passwordMatches) {
      throw {
        message: 'Login Failed',
      };
    }

    const { token, expirationTime } = createJWTToken(
      { id: isExistingUser.id, email: isExistingUser.email },
      'user'
    );

    return res.json({
      success: true,
      message: 'Signin successful',
      data: isExistingUser,
      token,
      expirationTime,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    Update User profile
// @route   PUT /v1/user/update
// @access  protected
export const userUpdateApi = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const author = req.user;
    console.log('author', author);

    const user = await prisma.user.findUnique({
      where: {
        id: author.id,
      },
    });

    if (!user) {
      throw {
        statusCode: 404,
        message: USER_MISSING,
      };
    }

    if (req.file) {
      const user = await prisma.user.findUnique({
        where: {
          id: +author.id,
        },
      });

      if (user?.profile_url?.includes(process.env.AWS_S3_BUCKET_NAME!)) {
        await deleteObjectFromS3(user?.profile_url);
      }

      const result = await uploadToS3(req.file);
      data.profile_url = result.Location;
    }

    if (data.password) {
      const hash = await argon2.hash(data.password);
      delete data.passwordConfirmation;
      data.password = hash;
    }

    const resp = await prisma.user.update({
      where: {
        id: author?.id,
      },
      data,
    });

    return res.status(200).json({
      status: true,
      data: resp,
    });
  } catch (error: any) {
    console.log(error);

    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    GET User
// @route   GET /v1/user/auth/me
// @access  Protected
export const me = async (req: Request, res: Response) => {
  try {
    const { authorization, Authorization } = req.headers;
    console.log('authorization', authorization);
    console.log('Authorization', Authorization);

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const idToken = authorization.split('Bearer ')[1];
    const decoded: any = decodeJWTToken(idToken, 'user');

    const email = decoded?.email;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(200).json({ status: true, data: user });
    } else {
      throw Error('No User found');
    }
  } catch (error: any) {
    let statusCode = 500;
    if (error.status_code) {
      statusCode = error.status_code;
    }
    return res.status(statusCode).json(generalError(error));
  }
};
