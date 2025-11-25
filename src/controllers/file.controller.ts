import { User } from '../../generated/prisma';
import fs from 'node:fs/promises';
import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';
import upload from '../middlewares/upload.middleware';
import NotFoundError from '../errors/NotFound.error';

const isFolderOwner = asyncHandler(async (req, res, next) => {
  const isLoggedIn = Boolean(req.user);

  if (isLoggedIn) {
    const user: User = req.user as User;
    const folderId: string = req.params.id;
    const folder = await prisma.folder.findUnique({ where: { id: folderId } });

    if (!folder) {
      throw new NotFoundError('Folder not found');
    }

    if (folder.ownerId === user.id) {
      return next();
    }

    return res.status(403).send('Not allowed');
  }

  return res.status(401).redirect('/login');
});

const getFile = asyncHandler(async (req, res) => {
  const isLoggedIn = Boolean(req.user);
  const fileId = req.params.id;

  if (isLoggedIn) {
    const file = await prisma.file.findUnique({ where: { id: fileId } });

    if (!file) {
      throw new NotFoundError('File not found');
    }

    const user: User = req.user as User;
    const isOwner = file.ownerId === user.id;

    if (isOwner) {
      return res.render('file/index', { file });
    }

    return res.status(403).send('Not allowed');
  }

  return res.status(401).redirect('/login');
});

const postFile = [
  isFolderOwner,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const user: User = req.user as User;
    const folderId: string = req.params.id;

    if (req.file) {
      const createdFile = await prisma.file.create({
        data: {
          name: req.file.originalname,
          mimetype: req.file.mimetype,
          path: req.file.path,
          size: req.file.size,
          folder: { connect: { id: folderId } },
          owner: { connect: { id: user.id } },
        },
        include: {
          folder: true,
        },
      });

      const isFileFolderRoot = createdFile.folder.parentId === null;
      const URLToRedirect = isFileFolderRoot ? '/drive' : `/drive/${folderId}`;

      return res.redirect(URLToRedirect);
    }

    // TODO: validate file
    throw new NotFoundError('File not found');
  }),
];

const downloadFile = asyncHandler(async (req, res) => {
  const isLoggedIn = Boolean(req.user);
  const fileId = req.params.id;

  if (isLoggedIn) {
    const file = await prisma.file.findUnique({ where: { id: fileId } });

    if (!file) {
      throw new NotFoundError('File not found');
    }

    const user: User = req.user as User;
    const isOwner = file.ownerId === user.id;

    if (isOwner) {
      return res.download(file.path);
    }

    return res.status(403).send('Not allowed');
  }

  return res.status(401).redirect('/login');
});

const deleteFile = asyncHandler(async (req, res) => {
  const isLoggedIn = Boolean(req.user);

  if (isLoggedIn) {
    const user: User = req.user as User;
    const fileId: string = req.params.id;
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { folder: true },
    });

    if (!file) {
      throw new NotFoundError('File not found');
    }

    const isOwner = file.ownerId === user.id;

    if (isOwner) {
      const isFileFolderRoot = file.folder.parentId === null;
      const URLToRedirect = isFileFolderRoot
        ? '/drive'
        : `/drive/${file.folder.id}`;

      await prisma.file.delete({ where: { id: fileId } });
      await fs.rm(file.path);

      return res.redirect(URLToRedirect);
    }

    return res.status(403).send('Not allowed');
  }
});

export default { getFile, postFile, downloadFile, deleteFile };
