import passport from 'passport';
import GoogleOAuth from 'passport-google-oauth20';

const GoogleStrategy = GoogleOAuth.Strategy;

const { OAUTH_GOOGLE_ID, OAUTH_GOOGLE_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: OAUTH_GOOGLE_ID,
      clientSecret: OAUTH_GOOGLE_SECRET,
      callbackURL: 'http://google.com',
    },
    (accessToken, refreshToken, profile, done) => {
      // what to do with data
      done();
    }
  )
);
