// Single instance of prisma database client to be used everywhere
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default prisma;
