import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const CALENDAR_URL = `http://localhost:5002`;

interface IParams {
  id: string;
}

const Calendar: React.FC = () => {
  const { id } = useParams<IParams>();
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        console.log(`${CALENDAR_URL}/calendar/events/${id}`);
        const res = await fetch(`${CALENDAR_URL}/calendar/events/${id}`);
        console.log(res);
        const calendarEvents = await res.json();
        console.log(calendarEvents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCalendarEvents();
  }, [id]);
  return <h2>calendar</h2>;
};

export default Calendar;
