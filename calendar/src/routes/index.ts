import { Router } from 'express';
import fetch from 'node-fetch';
const router = Router();

import { CalendarList } from '../interfaces/CalendarList';
import { Calendar } from '../interfaces/Calendar';

const API_ROUTES = {
  BASEURL: 'https://www.googleapis.com/calendar/v3/',
  CALENDAR_LIST: 'users/me/calendarList/',
  CALENDAR: 'calendars/',
  EVENT: 'events/',
};

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
