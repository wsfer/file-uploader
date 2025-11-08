import { validationResult } from 'express-validator';
import { User } from '../../generated/prisma';
import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';
import NotFoundError from '../errors/NotFound.error';
import validateFolder from '../middlewares/validateFolder.moddleware';

// TODO: return a pretty HTML page for 404 and 403 responses

const getUserRootFolder = asyncHandler(async (req, res) => {
  const isLoggedIn = Boolean(req.user);

  if (isLoggedIn) {
    const user: User = req.user as User;
    const userRootFolder = await prisma.folder.findFirst({
      where: { parentId: null, ownerId: user.id },
      include: {
        subfolders: true,
        files: true,
      },
    });

    return res.render('folder/index', { folder: userRootFolder });
  }

  return res.status(401).redirect('/login');
});

const getFolder = asyncHandler(async (req, res) => {
  const isLoggedIn = Boolean(req.user);

  if (isLoggedIn) {
    const user: User = req.user as User;
    const folderId: string = req.params.id;
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        parentFolder: true,
        subfolders: true,
        files: true,
      },
    });

    if (!folder) {
      throw new NotFoundError('Folder not found');
    }

    // TODO: add share feature and check if another user can access
    const isOwner = folder.ownerId === user.id;

    if (isOwner) {
      return res.render('folder/folder', { folder: folder });
    }

    return res.status(403).send('Not allowed');
  }

  return res.status(401).redirect('/login');
});

const postFolder = [
  validateFolder,
  asyncHandler(async (req, res) => {
    const isLoggedIn = Boolean(req.user);
    const errors = validationResult(req);
    const parentFolder = await prisma.folder.findUnique({
      where: { id: req.params.id },
      include: {
        parentFolder: true,
        subfolders: true,
        files: true,
      },
    });

    if (!parentFolder) {
      throw new NotFoundError('Folder not found');
    }

    if (!errors.isEmpty() && isLoggedIn) {
      const isRootFolder = parentFolder.parentFolder === null;
      const viewToRender = isRootFolder ? 'folder/index' : 'folder/folder';

      return res.render(viewToRender, {
        errors: errors.mapped(),
        values: req.body,
        folder: parentFolder,
      });
    }

    if (isLoggedIn) {
      const user: User = req.user as User;
      const parentFolderId: string = req.params.id;
      const newFolder = await prisma.folder.create({
        data: {
          name: req.body.name,
          owner: { connect: { id: user.id } },
          parentFolder: { connect: { id: parentFolderId } },
        },
      });

      return res.redirect(`/drive/${newFolder.id}`);
    }

    return res.status(401).redirect('/login');
  }),
];

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
