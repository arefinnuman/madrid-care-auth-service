import express, { Router } from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: Router /* use your router */,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
