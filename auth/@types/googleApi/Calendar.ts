export interface Calendar {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description: string;
  timeZone: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  accessRole: string;
  selected: boolean;
  primary: boolean;
  defaultReminders: any[];
  conferenceProperties: {
    [key: string]: any;
  };
  notificationSettings: {
    [key: string]: any;
  };
}
