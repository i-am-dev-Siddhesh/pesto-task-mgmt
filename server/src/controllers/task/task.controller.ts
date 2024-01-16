import { Request, Response } from 'express';
import { prisma } from '../../clients/prisma';
import { generalError } from '../../utils/errorResponse';

// @desc    Create Task
// @route   POST /v1/task/create
// @access  Protected
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const user = req.user;

    const resp = await prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate,
        userId: user.id,
      },
    });

    return res.json({
      success: true,
      data: resp,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    Update Task
// @route   PUT /v1/task/:taskId
// @access  Protected
export const updateTask = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = req.user;
    const taskId = +req.params.taskId;

    const resp = await prisma.task.updateMany({
      data: {
        ...data,
      },
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    return res.json({
      success: true,
      data: resp,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    Delete Task
// @route   Delete /v1/task/:taskId
// @access  Protected
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req?.params?.taskId;
    const user = req?.user;

    const resp = await prisma.task.deleteMany({
      where: {
        id: +taskId,
        userId: +user?.id,
      },
    });

    return res.json({
      success: true,
      data: resp,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    GET Task
// @route   PUT /v1/task/:taskId
// @access  Protected
export const getTask = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = req.user;
    const taskId = +req.params.taskId;

    const resp = await prisma.task.findFirstOrThrow({
      where: {
        id: taskId,
        userId: user.id,
      },
    });

    return res.json({
      success: true,
      data: resp,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};

// @desc    GET users Task
// @route   PUT /v1/task
// @access  Protected
export const getUsersTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const resp = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.json({
      success: true,
      data: resp,
    });
  } catch (error: any) {
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    }
    return res.status(statusCode).json(generalError(error));
  }
};
