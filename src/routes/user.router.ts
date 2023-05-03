import { Router } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import UserController from '@/controller/user.controller';
import UserMiddleware from '@/middleware/user.middleware';
import schema from '@/utils/schema/user.validation';

const router = Router();
const userController = new UserController();

const userMiddleware = new UserMiddleware();

router.post(
    '/register',
    validationMiddleware(schema.signUp),
    userMiddleware.checkIfUserExists,
    userController.register
);

router.post(
  '/login',
  validationMiddleware(schema.login),
  userController.login
);

export default router;
