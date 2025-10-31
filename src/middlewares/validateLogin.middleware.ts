import { body } from 'express-validator';

const validateUsername = body('username')
  .trim()
  .notEmpty()
  .withMessage('Username is required');

const validatePassword = body('password')
  .trim()
  .notEmpty()
  .withMessage('Password is required');

export default [validateUsername, validatePassword];
