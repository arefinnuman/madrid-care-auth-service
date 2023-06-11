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

router.get('/:id', InsuranceController.getAnInsurance);

router.patch(
  '/:id',
  validateRequest(InsuranceValidation.updateInsuranceZodSchema),
  InsuranceController.updateInsurance
);

router.delete('/:id', InsuranceController.deleteInsurance);

router.get('/', InsuranceController.getAllInsurance);

export const InsuranceRoutes = router;
