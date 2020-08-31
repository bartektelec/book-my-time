import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

import { CalendarList } from '../../@types/googleApi/CalendarList';
import { Calendar } from '../../@types/googleApi/Calendar';

import User from '../model/User';
import calendarAPIHandler from '../calendarApiHandler/index';

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);
  if (!user) return;
  req.currentUser = user;
  next();
};

router.get('/calendar/:id', tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const existingCalendars: CalendarList = await calendarAPIHandler.getCalendars(
      `Bearer ${req.currentUser?.accessToken}`
    );
    const calendar: Calendar | undefined = existingCalendars.items.find((item) => item.summary === 'Book my time');
    if (!calendar)
      return res.status(404).json({ message: `user with id : ${req.params.id} does not have BookMyTime calendar` });
    return res.json(calendar);
  } catch (error) {
    return res.json(error);
  }
});

// INITIATES NEW CALENDAR CALLED 'Book my Time'
// TODO PASS TOKEN INSTEAD OF HEADER?
router.post('/init', async (req, res) => {
  try {
    const existingCalendars: CalendarList = await calendarAPIHandler.getCalendars(`${req.headers.authorization}`);
    const calendar: Calendar | undefined = existingCalendars.items.find((item) => item.summary === 'Book my time');
    if (!calendar) return await calendarAPIHandler.createCalendar(`${req.headers.authorization}`);
    return res.json(calendar);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
