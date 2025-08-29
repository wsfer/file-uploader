import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';
import { User } from '../../generated/prisma';

const getUserRootFolder = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const getFolder = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const postFolder = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const renameFolder = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const deleteFolder = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

export default {
  getUserRootFolder,
  getFolder,
  postFolder,
  renameFolder,
  deleteFolder,
};
