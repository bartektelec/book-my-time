// packages
import { Router, Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';

// modules
import User from '../model/User';
import CalendarApiHandler from '../calendarApiHandler/index';

// types
import { CalendarList } from '../../interfaces/CalendarList';
import { Calendar } from '../../interfaces/Calendar';
import {
  CalendarEvent,
  CalendarEventResponse,
  RemoveEventParams,
  CalendarEventList,
} from '../../interfaces/CalendarEvents';

const router = Router();

const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'id not found' });
    req.currentUser = user;
    next();
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
};

router.get('/calendar/:id', tokenMiddleware, async (req: Request, res: Response) => {
  console.log('calendar!');
  try {
    const { accessToken, calendarId } = req.currentUser;
    const calendar: Calendar = await CalendarApiHandler.getCalendar(`Bearer ${accessToken}`, calendarId);
    return res.json(calendar);
  } catch (error) {
    return res.json(error);
  }
});

// INITIATES NEW CALENDAR CALLED 'Book my Time'
// REVIEW PASS TOKEN INSTEAD OF HEADER?
router.post('/init/:id', tokenMiddleware, async (req, res) => {
  try {
    const existingCalendars: CalendarList = await CalendarApiHandler.getCalendars(`${req.headers.authorization}`);
    const calendar: Calendar | undefined = existingCalendars.items.find((item) => item.summary === 'Book my time');
    if (!calendar) {
      const newCalendar = await CalendarApiHandler.createCalendar(`${req.headers.authorization}`);
      await User.updateOne({ _id: req.currentUser._id }, { calendarId: newCalendar.id });
      return res.json(newCalendar);
    }
    return res.json(calendar);
  } catch (error) {
    return res.json(error);
  }
});

router.get('/calendar/events/:id', tokenMiddleware, async (req, res) => {
  console.log('calendarevents!');
  try {
    const { accessToken, calendarId } = req.currentUser;

    // SET MIN TIME FOR GOOGLE CALENDAR API EVENTS TO BE TODAY AT 00:00 AND
    // MAX TIME TO BE 14 DAYS AHEAD
    const timeMin = new Date();
    const timeMax = new Date();
    const daysAhead = 14;
    timeMin.setHours(0, 0, 0, 0);
    timeMax.setDate(timeMax.getDate() + daysAhead + 1);
    timeMax.setHours(0, 0, 0, 0);

    console.log(timeMin);
    console.log(timeMax);

    const calendarEventList: CalendarEventList = await CalendarApiHandler.getEvents(
      `Bearer ${accessToken}`,
      calendarId,
      timeMin.toISOString(),
      timeMax.toISOString()
    );
    return res.json(calendarEventList);
  } catch (error) {
    return res.json(error);
  }
});

router.post('/addEvent/:id', tokenMiddleware, async (req, res) => {
  try {
    const { summary, start, end, description, attendees } = req.body;
    const { accessToken, calendarId } = req.currentUser;
    const eventDetails: CalendarEvent = {
      authHeader: `Bearer ${accessToken}`,
      calendarId,
      summary,
      start,
      end,
      description,
      attendees,
    };

    const eventRequest: CalendarEventResponse = await CalendarApiHandler.addEvent(eventDetails);
    return res.json(eventRequest);
  } catch (error) {
    return res.json(error);
  }
});

router.get('/cancel/:id/:eventId', tokenMiddleware, async (req, res) => {
  try {
    const { eventId, id } = req.params;
    const requestURI = `http://calendar:3000/calendar/${id}`;
    const calendarInfo = await fetch(requestURI);
    const calendarInfoJSON = await calendarInfo.json();
    const requestDetails: RemoveEventParams = {
      authHeader: `Bearer ${req.currentUser.accessToken}`,
      calendarId: calendarInfoJSON.id,
      eventId,
    };
    await CalendarApiHandler.removeEvent(requestDetails);
    return res.json({ status: 200, message: 'ok' });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
