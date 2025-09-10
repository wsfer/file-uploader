import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';
import { User } from '../../generated/prisma';

// TODO: create a middleware to check if user is logged in before to stop typescript errors
const getUserRootFolder = asyncHandler(async (req, res) => {
  const user: User = req.user;
  const userRootFolder = await prisma.folder.findFirst({
    where: { parentId: null, ownerId: user.id },
    include: {
      subfolders: true,
    },
  });

  res.render('folder/index', { folder: userRootFolder });
});

const getFolder = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const postFolder = asyncHandler(async (req, res) => {
  const user: User = req.user;
  const parentFolderId: string = req.params.id;
  const newFolder = await prisma.folder.create({
    data: {
      name: req.body.name,
      owner: { connect: { id: user.id } },
      parentFolder: { connect: { id: parentFolderId } },
    },
  });

  res.redirect(`/folder/${newFolder.id}`);
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
