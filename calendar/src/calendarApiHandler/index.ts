import fetch from 'node-fetch';
import { CalendarList } from '../../@types/googleApi/CalendarList';
import { Calendar } from '../../@types/googleApi/Calendar';

import { CalendarEvent, RemoveEventParams } from '../../@types/googleApi/CalendarEvents';

const API_ROUTES = {
  BASEURL: 'https://www.googleapis.com/calendar/v3/',
  CALENDAR_LIST: 'users/me/calendarList/',
  CALENDAR: 'calendars/',
  EVENT: 'events/',
};

class calendarAPIHandler {
  static getCalendars = async (authHeader: string) => {
    const { BASEURL, CALENDAR_LIST } = API_ROUTES;
    const response = await fetch(`${BASEURL}${CALENDAR_LIST}`, {
      headers: { Authorization: authHeader },
    });
    const existingCalendars: CalendarList = await response.json();
    return existingCalendars;
  };

  static createCalendar = async (authHeader: string) => {
    const { BASEURL, CALENDAR } = API_ROUTES;
    const postResponse = await fetch(`${BASEURL}${CALENDAR}`, {
      method: 'POST',
      headers: { Authorization: authHeader },
      body: JSON.stringify({ summary: 'Book my time' }),
    });
    const newCalendar: Calendar = await postResponse.json();
    return newCalendar;
  };

  static addEvent = async ({ authHeader, calendarId, start, end, summary, description, attendees }: CalendarEvent) => {
    const { BASEURL, CALENDAR, EVENT } = API_ROUTES;
    const queryURI = `${BASEURL}${CALENDAR}${calendarId}/${EVENT}`;
    const response = await fetch(queryURI, {
      method: 'POST',
      headers: { Authorization: authHeader },
      body: JSON.stringify({
        summary,
        start,
        end,
        description,
        attendees,
      }),
    });
    const responseJSON = await response.json();
    return responseJSON;
  };

  static removeEvent = async ({ authHeader, calendarId, eventId }: RemoveEventParams) => {
    const { BASEURL, CALENDAR, EVENT } = API_ROUTES;
    const queryURI = `${BASEURL}${CALENDAR}${calendarId}/${EVENT}${eventId}`;
    const response = await fetch(queryURI, {
      method: 'DELETE',
      headers: { Authorization: authHeader },
    });

    return await response.json();
  };
}

export default calendarAPIHandler;
