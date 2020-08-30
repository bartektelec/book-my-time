import { Router, Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
const router = Router();

import { CalendarList } from '../../@types/googleApi/CalendarList';
import { Calendar } from '../../@types/googleApi/Calendar';

import User, { IUser } from '../model/User';
import CalendarApiHandler from '../calendarApiHandler/index';
import calendarAPIHandler from '../calendarApiHandler/index';

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: `user with id : ${req.params.id} not found` });
  req.currentUser = user;
  next();
};

router.get('/calendar/:id', tokenMiddleware, async (req: Request, res: Response) => {
  console.log(req.currentUser);
});

// INITIATES NEW CALENDAR CALLED 'Book my Time'
// TODO PASS TOKEN INSTEAD OF HEADER?
router.post('/init', async (req, res) => {
  try {
    const existingCalendars: CalendarList = await calendarAPIHandler.getCalendars(`${req.headers.authorization}`);
    const doesCalendarExist: boolean = existingCalendars.items.some((item) => item.summary === 'Book my time');
    if (doesCalendarExist) return res.json(existingCalendars.items.find((item) => item.summary === 'Book my time'));
    return calendarAPIHandler.createCalendar(`${req.headers.authorization}`);
  } catch (error) {
    console.error(error);
  }
});

export default router;
