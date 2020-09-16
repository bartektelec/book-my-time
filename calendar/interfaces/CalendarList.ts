import { Calendar } from './Calendar';

export interface CalendarList {
  kind: string;
  etag: string;
  nextSyncToken: string;
  items: Calendar[];
}
