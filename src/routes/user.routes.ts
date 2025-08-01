import { Router } from 'express';
import userController from '../controllers/user.controller';
import passport from '../modules/passport';

const userRouter = Router();

userRouter.get('/', userController.getIndex);
userRouter.get('/login', userController.getLogin);
userRouter.get('/register', userController.getRegister);
userRouter.post('/login', passport.authenticate('local'));
userRouter.post('/register', userController.postRegister);

export default userRouter;
