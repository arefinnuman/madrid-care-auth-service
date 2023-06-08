import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { InsuranceController } from './insurance.controller';
import { InsuranceValidation } from './insurance.validation';

const router = express.Router();

router.post(
  '/create-insurance',
  validateRequest(InsuranceValidation.createInsuranceZodSchema),
  InsuranceController.createInsurance
);

export const InsuranceRoutes = router;
