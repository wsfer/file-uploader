import { validationResult } from 'express-validator';
import { User } from '../../generated/prisma';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import passport from '../modules/passport';
import prisma from '../modules/prisma';
import validateUser from '../middlewares/validateUser.middleware';
import validateLogin from '../middlewares/validateLogin.middleware';

const getIndex = asyncHandler(async (req, res) => {
  res.render('user/index');
});

const getLogin = asyncHandler(async (req, res) => {
  res.render('user/login');
});

const getRegister = asyncHandler(async (req, res) => {
  res.render('user/register');
});

const postLogin = [
  validateLogin,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('user/login', {
        errors: errors.mapped(),
        values: req.body,
      });
    }

    passport.authenticate('local', (err: Error, user: User) => {
      if (err) throw err;

      if (!user) {
        const formErrors = {
          username: { msg: 'User not found or wrong password' },
          password: { msg: 'User not found or wrong password' },
        };

        return res.render('user/login', {
          errors: formErrors,
          values: req.body,
        });
      }

      req.login(user, () => res.redirect('drive'));
    })(req, res);
  }),
];

const postRegister = [
  validateUser,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('user/register', {
        errors: errors.mapped(),
        values: req.body,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRootFolder = { name: '.' };
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        folders: { create: [userRootFolder] },
      },
    });

    // Automatically login the created user
    req.login(createdUser, (err) => {
      if (err) throw err;
      res.redirect('/drive');
    });
  }),
];

const postLogout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default {
  getIndex,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  postLogout,
};
