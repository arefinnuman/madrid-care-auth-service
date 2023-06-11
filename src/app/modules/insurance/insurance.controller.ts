import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constant/pagination';
import catchAsync from '../../../functions/catchAsync';
import sendResponse from '../../../functions/sendResponse';
import pick from '../../../shared/pick';
import { insuranceFilterAbleField } from './insurance.constant';
import { IInsurance } from './insurance.interface';
import { InsuranceService } from './insurance.service';

const createInsurance = catchAsync(async (req: Request, res: Response) => {
  const { ...insuranceData } = req.body;
  const result = await InsuranceService.createInsurance(insuranceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Insurance created Successfully`,
    data: result,
  });
});

const getAllInsurance = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, insuranceFilterAbleField);
  const patinationOptions = pick(req.query, paginationFields);

  const result = await InsuranceService.getAllInsurance(
    filters,
    patinationOptions
  );

  sendResponse<IInsurance[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Insurance Data`,
    meta: result.meta,
    data: result.data,
  });
});

const getAnInsurance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await InsuranceService.getAnInsurance(id);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `${id} not found in Database`,
    });
  } else {
    sendResponse<IInsurance>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Semester Data `,
      data: result,
    });
  }
});

const updateInsurance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await InsuranceService.updateInsurance(id, updatedData);
  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `${id} not found in Database`,
    });
  } else {
    sendResponse<IInsurance>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Semester Data Updated`,
      data: result,
    });
  }
});

const deleteInsurance = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await InsuranceService.deleteInsurance(id);

  sendResponse<IInsurance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully !',
    data: result,
  });
});

export const InsuranceController = {
  createInsurance,
  getAllInsurance,
  getAnInsurance,
  updateInsurance,
  deleteInsurance,
};
