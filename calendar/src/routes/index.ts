import { Router, Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
const router = Router();

import { CalendarList } from '../../@types/googleApi/CalendarList';
import { Calendar } from '../../@types/googleApi/Calendar';

import User, { IUser } from '../model/User';

const API_ROUTES = {
  BASEURL: 'https://www.googleapis.com/calendar/v3/',
  CALENDAR_LIST: 'users/me/calendarList/',
  CALENDAR: 'calendars/',
  EVENT: 'events/',
};

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
router.get('/init', async (req, res) => {
  const { BASEURL, CALENDAR_LIST, CALENDAR } = API_ROUTES;
  try {
    const response = await fetch(`${BASEURL}${CALENDAR_LIST}`);
    const existingCalendars: CalendarList = await response.json();

    console.log(existingCalendars);

    if (!existingCalendars.items.some((item) => item.summary === 'Book my time')) {
      // create a new calendar

      const postResponse = await fetch(`${BASEURL}${CALENDAR}`, {
        method: 'POST',
        body: JSON.stringify({ summary: 'Book my time' }),
      });
      const newCalendar: Calendar = await postResponse.json();

      return res.json(newCalendar);
    }
    // if there is a calendar called 'Book my time'
    return res.json(existingCalendars.items.find((item) => item.summary === 'Book my time'));
  } catch (error) {
    console.log('Calendar service failed: ' + error);
  }
});

export default router;
