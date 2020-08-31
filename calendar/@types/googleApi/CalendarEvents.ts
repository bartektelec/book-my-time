export interface EventTime {
  date?: string;
  dateTime?: string;
  timeZone?: string;
}

export interface Attendee {
  displayName?: string;
  email: string;
  optional?: boolean;
  resource?: boolean;
  comment?: string;
  additionalGuests?: number;
  responseStatus?: string;
  self?: boolean
}
export interface CalendarEvent {
  authHeader: string;
  calendarId: string;
  start: EventTime;
  end: EventTime;
  summary: string;
  description: string;
  attendees: Attendee[];
}

export interface CalendarEventResponse {
  kind: string,
  etag: string,
  id: string,
  status: string,
  htmlLink: string,
  created: string,
  updated: string,
  summary: string,
  creator: Attendee,
  organizer: Attendee,
  start: EventTime,
  end: EventTime,
  iCalUID: string,
  sequence: number,
  reminders?: any,
}