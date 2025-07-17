import express from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  const envVar = process.env.ENV_VAR;
  res.render('index', { users, envVar });
});

app.listen(3000, () => console.log(`Server started`));
