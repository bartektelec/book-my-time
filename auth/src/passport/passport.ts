import googleStrategy from './googleStrategy';
import User, { IUser } from '../model/User';
import { VerifyCallback } from 'passport-google-oauth20';
import passport from 'passport';

passport.serializeUser((user: IUser, cb: VerifyCallback) => {
  cb(undefined, user._id);
});

passport.deserializeUser((id: string, cb: VerifyCallback) => {
  User.findOne({ _id: id }, (err: Error, user: IUser) => {
    cb(err, user);
  });
});

passport.use(googleStrategy);

export default passport;
