import { Model } from 'mongoose';

export type IInsuranceTiles =
  | 'Basic Health Insurance'
  | 'Premium Health Insurance'
  | 'Platinum Health Insurance';

export type IInsuranceCodes = 'b101' | 'p202' | 'p333';

export type IInsurancePrices = 100 | 200 | 300;

export type IInsuranceMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface IInsurance {
  title: IInsuranceTiles;
  code: IInsuranceCodes;
  price: IInsurancePrices;
  startMonths: IInsuranceMonths;
  endMonths: IInsuranceMonths;
}

export type InsuranceModel = Model<IInsurance, object>;
