import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import {
  insuranceCodeMapper,
  insurancePriceMapper,
} from './insurance.constant';
import { IInsurance } from './insurance.interface';
import { Insurance } from './insurance.model';
import { getCurrentYear } from './insurance.utilis';

const createInsurance = async (payload: IInsurance): Promise<IInsurance> => {
  if (
    insuranceCodeMapper[payload.code] !== payload.title ||
    insurancePriceMapper[payload.code] !== payload.price
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Code`);
  }
  payload.startYear = getCurrentYear();
  const endTime = [payload.startMonth, payload.startYear + 6];

  payload.endingTime = `${endTime[0]}, ${endTime[1]}`;
  const result = await Insurance.create(payload);
  return result;
};

export const InsuranceService = {
  createInsurance,
};
