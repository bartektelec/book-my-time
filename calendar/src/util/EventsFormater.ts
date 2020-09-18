import { CalendarEvent, CalendarEventResponse } from '../../interfaces/CalendarEvents';
const eventsMock: CalendarEventResponse[] = [
  {
    kind: 'calendar#event',
    etag: '"3200538808694000"',
    id: '1s512vjjf44tbhfgkmg29sp5oa',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=MXM1MTJ2ampmNDR0YmhmZ2ttZzI5c3A1b2EgNzU2Z2psZWI1b2JqY2F2MGhzc2MyNWZmNGNAZw',
    created: '2020-09-16T15:16:44.000Z',
    updated: '2020-09-16T15:16:44.347Z',
    summary: '3',
    creator: {
      email: 'jjdroid6969@gmail.com',
    },
    organizer: {
      email: '756gjleb5objcav0hssc25ff4c@group.calendar.google.com',
      displayName: 'Book my time',
      self: true,
    },
    start: {
      dateTime: '2020-09-18T12:00:00Z',
    },
    end: {
      dateTime: '2020-09-18T13:00:00Z',
    },
    iCalUID: '1s512vjjf44tbhfgkmg29sp5oa@google.com',
    sequence: 0,
    reminders: {
      useDefault: true,
    },
  },
  {
    kind: 'calendar#event',
    etag: '"3200539458392000"',
    id: '3kt26fg2341ome59i00tt9csnn',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=M2t0MjZmZzIzNDFvbWU1OWkwMHR0OWNzbm4gNzU2Z2psZWI1b2JqY2F2MGhzc2MyNWZmNGNAZw',
    created: '2020-09-16T15:22:09.000Z',
    updated: '2020-09-16T15:22:09.196Z',
    summary: '6',
    creator: {
      email: 'jjdroid6969@gmail.com',
    },
    organizer: {
      email: '756gjleb5objcav0hssc25ff4c@group.calendar.google.com',
      displayName: 'Book my time',
      self: true,
    },
    start: {
      dateTime: '2020-09-18T16:00:00Z',
    },
    end: {
      dateTime: '2020-09-18T17:00:00Z',
    },
    transparency: 'transparent',
    iCalUID: '3kt26fg2341ome59i00tt9csnn@google.com',
    sequence: 0,
    reminders: {
      useDefault: true,
    },
  },
  {
    kind: 'calendar#event',
    etag: '"3200541629624000"',
    id: '7vnec5ik0mvpn1u1dq4idk2ile',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=N3ZuZWM1aWswbXZwbjF1MWRxNGlkazJpbGUgNzU2Z2psZWI1b2JqY2F2MGhzc2MyNWZmNGNAZw',
    created: '2020-09-16T15:40:14.000Z',
    updated: '2020-09-16T15:40:14.812Z',
    summary: '7',
    creator: {
      email: 'jjdroid6969@gmail.com',
    },
    organizer: {
      email: '756gjleb5objcav0hssc25ff4c@group.calendar.google.com',
      displayName: 'Book my time',
      self: true,
    },
    start: {
      dateTime: '2020-09-30T09:00:00Z',
    },
    end: {
      dateTime: '2020-09-30T10:00:00Z',
    },
    iCalUID: '7vnec5ik0mvpn1u1dq4idk2ile@google.com',
    sequence: 0,
    reminders: {
      useDefault: true,
    },
  },
  {
    kind: 'calendar#event',
    etag: '"3200706644688000"',
    id: '1di7ir34c6p71cnub0jc8v17ti',
    status: 'confirmed',
    htmlLink:
      'https://www.google.com/calendar/event?eid=MWRpN2lyMzRjNnA3MWNudWIwamM4djE3dGkgNzU2Z2psZWI1b2JqY2F2MGhzc2MyNWZmNGNAZw',
    created: '2020-09-17T14:35:22.000Z',
    updated: '2020-09-17T14:35:22.344Z',
    summary: 'dab',
    creator: {
      email: 'jjdroid6969@gmail.com',
    },
    organizer: {
      email: '756gjleb5objcav0hssc25ff4c@group.calendar.google.com',
      displayName: 'Book my time',
      self: true,
    },
    start: {
      dateTime: '2020-10-01T09:30:00Z',
    },
    end: {
      dateTime: '2020-10-01T10:30:00Z',
    },
    iCalUID: '1di7ir34c6p71cnub0jc8v17ti@google.com',
    sequence: 0,
    reminders: {
      useDefault: true,
    },
  },
];

const isNotInHourBounds = (hour: number, startHour: number, endHour: number) => {
  return hour < startHour || hour > endHour;
};

const isAlreadyBooked = (events: CalendarEventResponse[], min: Date, max: Date) => {
  return events.some(({ start }) => {
    const eventDate = new Date(start.dateTime);
    return eventDate >= min && eventDate <= max;
  });
};

class EventsFormatter {
  static formatEvents = (events: CalendarEventResponse[], daysAhead: number) => {
    const daysAmount = 10;
    const hoursInADay = 24;

    const EMPTY_COLUMNS = Array.from({ length: daysAmount }, () => Array.from({ length: hoursInADay }, () => 0));

    const startHour = 8;
    const endHour = 20;
    const date = new Date();

    const AVAILABLE_HOURS_COLUMNS = EMPTY_COLUMNS.map((column, dayIndex) => {
      const newCol = column.map((_, hourIndex) => {
        const min = new Date(date.setHours(startHour + hourIndex));
        min.setDate(min.getDate() + dayIndex);
        const max = new Date(date.setHours(startHour + hourIndex + 1));
        max.setDate(max.getDate() + dayIndex);

        if (isNotInHourBounds(hourIndex, startHour, endHour)) return 0;
        if (isAlreadyBooked(events, min, max)) return 1;
        return 2;
      });
      return newCol;
    });
    return AVAILABLE_HOURS_COLUMNS;
  };
}

console.log(EventsFormatter.formatEvents(eventsMock, 14));
export default EventsFormatter;
