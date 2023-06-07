import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import { InsuranceService } from './insurance.service';

const createInsurance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...insuranceData } = req.body;
    const result = await InsuranceService.createInsurance(insuranceData);
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Insurance created Successfully`,
      data: result,
    });
  }
);

export const InsuranceController = {
  createInsurance,
};
