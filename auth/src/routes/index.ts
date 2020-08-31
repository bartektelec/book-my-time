import { Router, Request, Response } from 'express';
import fetch, { RequestInfo } from 'node-fetch';
import passport from 'passport';
import { Calendar } from '../../@types/googleApi/Calendar';
import { IUser } from '../model/User';
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
  async function (req: Request, res: Response) {
    const CALENDAR_IP = `http://${process.env.CALENDAR_IP}:3000` as RequestInfo;
    console.log(req.user);
    const { id, accessToken } = req.user as IUser;

    try {
      const calendarResp = await fetch(`${CALENDAR_IP}/init`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const calendarRespJson: Calendar = await calendarResp.json();
      console.log(calendarRespJson);
      res.redirect(`${process.env.OAUTH_CALLBACK_URL}?id=${id}`);
    } catch (err) {
      return res.json(err);
    }
  }
);

export default router;
