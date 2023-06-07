import { IInsurance } from './insurance.interface';
import { Insurance } from './insurance.model';

const createInsurance = async (payload: IInsurance): Promise<IInsurance> => {
  const result = await Insurance.create(payload);
  return result;
};

export const InsuranceService = {
  createInsurance,
};
