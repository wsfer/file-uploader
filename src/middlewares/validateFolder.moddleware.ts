import { body } from 'express-validator';
import prisma from '../modules/prisma';

const validateName = body('name')
  .trim()
  .isLength({ min: 3 })
  .withMessage('Folder name is too short, must be between 3 and 20 characters')
  .isLength({ max: 20 })
  .withMessage('Folder name is too long, must be between 3 and 20 characters')
  .custom(async (value, { req }) => {
    const parentId = req.params?.id;
    const existingFolder = await prisma.folder.findFirst({
      where: { name: value, parentId: parentId as string },
    });

    if (existingFolder) {
      throw new Error('Folder already exists');
    }
  })
  .withMessage('Folder already exists');

export default [validateName];
