import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', userController.getIndex);
userRouter.get('/login', userController.getLogin);
userRouter.get('/register', userController.getRegister);
userRouter.post('/login', userController.postLogin);
userRouter.post('/register', userController.postRegister);
userRouter.post('/logout', userController.postLogout);

export default userRouter;
