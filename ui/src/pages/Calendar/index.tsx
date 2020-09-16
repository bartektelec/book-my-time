import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AppointmentColumn from '../../components/Calendar/AppointmentsColumn';
import HoursColumn from '../../components/Calendar/HoursColumn';

const CALENDAR_URL = `http://localhost:5002`;

interface IParams {
  id: string;
}

const CalendarContainer = styled.div`
  display: flex;
`;

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

  return (
    <CalendarContainer>
      <HoursColumn />
      <AppointmentColumn>
        <button>1</button>
        <button>2</button>
      </AppointmentColumn>
    </CalendarContainer>
  );
};

export default Calendar;
