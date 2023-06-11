import {
  IInsuranceCodes,
  IInsuranceMonths,
  IInsurancePrices,
  IInsuranceTiles,
} from './insurance.interface';

export const insuranceTitles: IInsuranceTiles[] = [
  'Basic Health Insurance',
  'Premium Health Insurance',
  'Platinum Health Insurance',
];

export const insuranceCodes: IInsuranceCodes[] = ['b101', 'p202', 'p333'];

export const insurancePrices: IInsurancePrices[] = [100, 200, 300];

export const insuranceMonths: IInsuranceMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const insuranceCodeMapper: {
  [key: string]: string;
} = {
  b101: `Basic Health Insurance`,
  p202: `Premium Health Insurance`,
  p333: `Platinum Health Insurance`,
};

export const insurancePriceMapper: {
  [key: string]: number;
} = {
  b101: 100,
  p202: 200,
  p333: 300,
};

export const insuranceSearchFields = ['title', 'code', 'year'];

export const insuranceFilterAbleField = ['searchTerm', 'title', 'code', 'year'];
