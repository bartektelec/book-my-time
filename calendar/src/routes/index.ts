// packages
import { Router, Request, Response, NextFunction } from 'express';

// modules
import User from '../model/User';
import calendarAPIHandler from '../calendarApiHandler/index';

// types
import { CalendarList } from '../../@types/googleApi/CalendarList';
import { Calendar } from '../../@types/googleApi/Calendar';
import { CalendarEvent, CalendarEventResponse, RemoveEventParams } from '../../@types/googleApi/CalendarEvents';
import fetch from 'node-fetch';

const router = Router();

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

// REVIEW Consider getting calendarId using GET /calendar/:id route,
// instead of passing it as a body parameter

router.post('/addEvent/:id', tokenMiddleware, async (req, res) => {
  try {
    const { calendarId, summary, start, end, description, attendees } = req.body;

    const eventDetails: CalendarEvent = {
      authHeader: `Bearer ${req.currentUser?.accessToken}`,
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
      authHeader: `Bearer ${req.currentUser?.accessToken}`,
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
