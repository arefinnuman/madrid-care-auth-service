import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User created Successfully`,
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
