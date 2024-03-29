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
    console.log('taskId', taskId, 'req.params', req.params.taskId);

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
    const isExists = await prisma.task.findMany({
      where: {
        userId: user?.id,
        id: +taskId,
      },
    });

    if (isExists?.length === 0) {
      throw {
        statusCode: 409,
        message: 'Task is not present',
      };
    }
    const resp = await prisma.task.delete({
      where: {
        id: +taskId,
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
// @route   PUT /v1/task/all
// @access  Protected
export const fetchUsersTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    let { orderBy, ...filters } = req.body;
    let conditions: any = {
      userId: user.id,
    };
    if (filters.status) {
      conditions.status = filters.status;
    }

    const resp = await prisma.task.findMany({
      where: conditions,
      orderBy: {
        dueDate: orderBy || 'asc',
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
