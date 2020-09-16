import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AppointmentColumn from '../../components/Calendar/AppointmentsColumn';
import HoursColumn from '../../components/Calendar/HoursColumn';
import ScheduleBtn from '../../components/ScheduleBtn';

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

  const MockBtns = () => (
    <>
      <ScheduleBtn variant="free" />
      <ScheduleBtn variant="busy" />
      <ScheduleBtn variant="free" />
      <ScheduleBtn variant="free" />
      <ScheduleBtn variant="free" />
      <ScheduleBtn variant="busy" />
      <ScheduleBtn variant="free" />
      <ScheduleBtn variant="busy" />
      <ScheduleBtn variant="free" />
      <ScheduleBtn variant="free" />
    </>
  );

  return (
    <CalendarContainer>
      <HoursColumn />
      <AppointmentColumn>
        <MockBtns />
      </AppointmentColumn>
    </CalendarContainer>
  );
};

export default Calendar;
