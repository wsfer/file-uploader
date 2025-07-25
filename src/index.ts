import express from 'express';
import prisma from './modules/prisma';
import userRouter from './routes/user.routes';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', userRouter);

app.get('/test', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => console.log(`Server started`));
