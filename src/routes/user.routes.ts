import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/login', userController.getLogin);
userRouter.get('/register', userController.getRegister);

export default userRouter;
