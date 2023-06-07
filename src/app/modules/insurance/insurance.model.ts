import { Schema, model } from 'mongoose';
import {
  insuranceCodes,
  insuranceMonths,
  insurancePrices,
  insuranceTitles,
} from './insurance.constant';
import { IInsurance, InsuranceModel } from './insurance.interface';

const insuranceSchema = new Schema<IInsurance>(
  {
    title: {
      type: String,
      required: true,
      enum: insuranceTitles,
    },
    code: {
      type: String,
      required: true,
      enum: insuranceCodes,
    },
    price: {
      type: Number,
      required: true,
      enum: insurancePrices,
    },

    startMonths: {
      type: String,
      required: true,
      enum: insuranceMonths,
    },
    endMonths: {
      type: String,
      required: true,
      enum: insuranceMonths,
    },
  },
  {
    timestamps: true,
  }
);

export const Insurance = model<IInsurance, InsuranceModel>(
  'Insurance',
  insuranceSchema
);
