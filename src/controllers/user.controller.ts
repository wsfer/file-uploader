import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import passport from '../modules/passport';
import prisma from '../modules/prisma';

const getIndex = asyncHandler(async (req, res) => {
  res.render('user/index');
});

const getLogin = asyncHandler(async (req, res) => {
  res.render('user/login');
});

const getRegister = asyncHandler(async (req, res) => {
  res.render('user/register');
});

const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

const postRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  res.redirect('/');
});

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
