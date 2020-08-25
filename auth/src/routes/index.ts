import { Router, Request, Response } from 'express';
import passport from 'passport';
const router = Router();

router.post(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    accessType: 'offline',
    prompt: 'consent',
  })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  async function (req: any, res: Response) {
    console.log(req.user);
    const { _id, email, refreshToken, accessToken, displayName } = req.user;
    const stringParams = `?_id=${_id}&email=${email}&accessToken=${accessToken}&refreshToken=${refreshToken}&displayName=${displayName}`;
    res.redirect(`${process.env.OAUTH_CALLBACK_URL}${stringParams}`);
  }
);

export default router;
