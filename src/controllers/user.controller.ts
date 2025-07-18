import asyncHandler from 'express-async-handler';

const getLogin = asyncHandler(async (req, res) => {
  res.render('user/login');
});

const getRegister = asyncHandler(async (req, res) => {
  res.render('user/register');
});

export default { getLogin, getRegister };
