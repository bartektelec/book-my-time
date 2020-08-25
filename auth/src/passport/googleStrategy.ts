const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../model/User';
import { VerifyCallback, Profile } from 'passport-google-oauth20';
const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

const googleStrategy = new GoogleStrategy(
  {
    clientID: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    callbackURL: '/callback',
  },
  async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
    try {
      const user = await User.findOneOrCreate(accessToken, refreshToken, profile);
      cb(undefined, user);
    } catch (err) {
      console.error(err);
      cb(err);
    }
  }
);

export default googleStrategy;
