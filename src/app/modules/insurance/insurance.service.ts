import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/IPagination';
import { IGenericResponse } from '../../../interfaces/iGenericResponse';
import {
  insuranceCodeMapper,
  insurancePriceMapper,
  insuranceSearchFields,
} from './insurance.constant';
import { IInsurance, IInsuranceFilters } from './insurance.interface';
import { Insurance } from './insurance.model';
import { getCurrentYear } from './insurance.utilis';

const createInsurance = async (payload: IInsurance): Promise<IInsurance> => {
  if (
    insuranceCodeMapper[payload.code] !== payload.title ||
    insurancePriceMapper[payload.code] !== payload.price
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Code`);
  }

  if (!payload.startYear) {
    payload.startYear = getCurrentYear();
  }
  const endTime = [payload.startMonth, payload.startYear + 6];
  payload.endingTime = `${endTime[0]}, ${endTime[1]}`;

  const result = await Insurance.create(payload);
  return result;
};

const getAllInsurance = async (
  filters: Partial<IInsuranceFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IInsurance[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: insuranceSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0
      ? {
          $and: andConditions,
        }
      : {};

  const result = await Insurance.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Insurance.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAnInsurance = async (id: string): Promise<IInsurance | null> => {
  const result = await Insurance.findById(id);
  return result;
};

const updateInsurance = async (
  id: string,
  payload: Partial<IInsurance>
): Promise<IInsurance | null> => {
  if (
    (payload.code &&
      payload.title &&
      insuranceCodeMapper[payload.code] !== payload.title) ||
    (payload.code &&
      payload.price &&
      insurancePriceMapper[payload.code] !== payload.price)
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid Code`);
  }

  const result = await Insurance.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteInsurance = async (id: string): Promise<IInsurance | null> => {
  const result = await Insurance.findByIdAndDelete(id, { new: true });
  return result;
};

export const InsuranceService = {
  createInsurance,
  getAllInsurance,
  getAnInsurance,
  updateInsurance,
  deleteInsurance,
};
