import { z } from 'zod';
import {
  insuranceCodes,
  insuranceMonths,
  insuranceTitles,
} from './insurance.constant';

const createInsuranceZodSchema = z.object({
  body: z.object({
    title: z.enum([...insuranceTitles] as [string, ...string[]], {
      required_error: 'Invalid insurance title',
    }),
    code: z.enum([...insuranceCodes] as [string, ...string[]], {
      required_error: 'Invalid insurance code',
    }),

    price: z.number({
      required_error: 'Invalid insurance price',
    }),
    startMonth: z.enum([...insuranceMonths] as [string, ...string[]], {
      required_error: `Start Month is required`,
    }),
  }),
});

export const InsuranceValidation = {
  createInsuranceZodSchema,
};
