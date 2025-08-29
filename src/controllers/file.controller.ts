import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';
import { User } from '../../generated/prisma';

const getFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const postFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const renameFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const deleteFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

export default { getFile, postFile, renameFile, deleteFile };
