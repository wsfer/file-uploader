import { User } from '../../generated/prisma';
import asyncHandler from 'express-async-handler';
import prisma from '../modules/prisma';
import upload from '../middlewares/upload.middleware';

const isFolderOwner = asyncHandler(async (req, res, next) => {
  const isLoggedIn = Boolean(req.user);

  if (isLoggedIn) {
    const user: User = req.user as User;
    const folderId: string = req.params.id;
    const folder = await prisma.folder.findUnique({ where: { id: folderId } });

    if (!folder) {
      return res.status(404).send('Not found');
    }

    if (folder.ownerId === user.id) {
      return next();
    }

    return res.status(403).send('Not allowed');
  }

  return res.status(401).redirect('/login');
});

const getFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
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
    throw new Error('File not found');
  }),
];

const renameFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

const deleteFile = asyncHandler(async (req, res) => {
  res.send('not implemented');
});

export default { getFile, postFile, renameFile, deleteFile };
