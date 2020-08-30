import { CalendarList } from '../../@types/googleApi/CalendarList';
import { Calendar } from '../../@types/googleApi/Calendar';

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
}

export default calendarAPIHandler;
