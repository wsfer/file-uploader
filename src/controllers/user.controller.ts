import asyncHandler from 'express-async-handler';

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
  res.redirect('/');
});

export default { getLogin, getRegister, postLogin, postRegister };
