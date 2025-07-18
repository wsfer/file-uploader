import { PrismaClient } from '../generated/prisma';
import express from 'express';
import userRouter from './routes/user.routes';

const prisma = new PrismaClient();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', userRouter);

app.listen(3000, () => console.log(`Server started`));
