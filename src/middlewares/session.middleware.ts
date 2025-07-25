import crypto from 'crypto';
import expressSession from 'express-session';
import prisma from '../modules/prisma';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(48).toString('hex');

const store = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

export default expressSession({
  store: store,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6 * 60 * 60 * 1000, // 6 hour
  },
});
