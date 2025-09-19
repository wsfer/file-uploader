import { Request } from 'express';
import { User as PrismaUser } from '../../generated/prisma';

// Add prisma User type on req.user to stop errors
declare global {
  namespace Express {
    export interface Request {
      user?: PrismaUser;
    }
  }
}
