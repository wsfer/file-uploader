import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';

const getLogin = asyncHandler(async (req, res) => {
  res.render('user/login');
});

const getRegister = asyncHandler(async (req, res) => {
  res.render('user/register');
});

const postLogin = asyncHandler(async (req, res) => {
  res.redirect('/');
});

const postRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  res.redirect('/');
});

export default { getLogin, getRegister, postLogin, postRegister };
