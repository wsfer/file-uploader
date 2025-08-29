import express from 'express';
import session from './middlewares/session.middleware';
import passport from './modules/passport';
import prisma from './modules/prisma';
import userRouter from './routes/user.routes';
import folderRouter from './routes/folder.routes';
import fileRouter from './routes/file.routes';
import errorHandler from './middlewares/errorHandler.middleware';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', userRouter);
app.use('/folder', folderRouter);
app.use('/file', fileRouter);

app.get('/test', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use(errorHandler);

app.listen(3000, () => console.log(`Server started`));
