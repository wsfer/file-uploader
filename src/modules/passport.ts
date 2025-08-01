import bcrypt from 'bcryptjs';
import passport from 'passport';
import prisma from './prisma';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../generated/prisma';

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return done(null, false);
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
