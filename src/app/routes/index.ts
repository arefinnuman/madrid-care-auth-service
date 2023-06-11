import express from 'express';
import { InsuranceRoutes } from '../modules/insurance/insurance.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/insurances',
    route: InsuranceRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
