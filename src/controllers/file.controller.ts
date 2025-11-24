import { User } from '../../generated/prisma';
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
    const fileInfo = req.file;

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
      });

      return res.redirect(`/drive/${folderId}`);
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

const renameFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const deleteFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

export default { getFile, postFile, downloadFile, renameFile, deleteFile };
