// packages
import { Router, Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';

// modules
import User from '../model/User';
import calendarAPIHandler from '../calendarApiHandler/index';

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
    const calendar: Calendar = await calendarAPIHandler.getCalendar(`Bearer ${accessToken}`, calendarId);
    return res.json(calendar);
  } catch (error) {
    return res.json(error);
  }
});

// INITIATES NEW CALENDAR CALLED 'Book my Time'
// REVIEW PASS TOKEN INSTEAD OF HEADER?
router.post('/init/:id', tokenMiddleware, async (req, res) => {
  try {
    const existingCalendars: CalendarList = await calendarAPIHandler.getCalendars(`${req.headers.authorization}`);
    const calendar: Calendar | undefined = existingCalendars.items.find((item) => item.summary === 'Book my time');
    if (!calendar) {
      const newCalendar = await calendarAPIHandler.createCalendar(`${req.headers.authorization}`);
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
    const calendarEventList: CalendarEventList = await calendarAPIHandler.getEvents(
      `Bearer ${accessToken}`,
      calendarId
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

    const eventRequest: CalendarEventResponse = await calendarAPIHandler.addEvent(eventDetails);
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
    await calendarAPIHandler.removeEvent(requestDetails);
    return res.json({ status: 200, message: 'ok' });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
