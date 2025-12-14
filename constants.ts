import { TimeZone } from './types';

export const COMMON_TIMEZONES: TimeZone[] = [
  // UTC
  { id: 'UTC', name: 'UTC (Universal Time)', abbrev: 'UTC', gmtOffsetLabel: 'GMT+00:00' },

  // North America (USA & Canada)
  { id: 'America/New_York', name: 'New York, USA (Eastern)', abbrev: 'EST', gmtOffsetLabel: 'GMT-05:00' },
  { id: 'America/Toronto', name: 'Toronto, Canada (Eastern)', abbrev: 'EST', gmtOffsetLabel: 'GMT-05:00' },
  { id: 'America/Chicago', name: 'Chicago, USA (Central)', abbrev: 'CST', gmtOffsetLabel: 'GMT-06:00' },
  { id: 'America/Winnipeg', name: 'Winnipeg, Canada (Central)', abbrev: 'CST', gmtOffsetLabel: 'GMT-06:00' },
  { id: 'America/Denver', name: 'Denver, USA (Mountain)', abbrev: 'MST', gmtOffsetLabel: 'GMT-07:00' },
  { id: 'America/Phoenix', name: 'Phoenix, USA (Mountain - No DST)', abbrev: 'MST', gmtOffsetLabel: 'GMT-07:00' },
  { id: 'America/Los_Angeles', name: 'Los Angeles, USA (Pacific)', abbrev: 'PST', gmtOffsetLabel: 'GMT-08:00' },
  { id: 'America/Vancouver', name: 'Vancouver, Canada (Pacific)', abbrev: 'PST', gmtOffsetLabel: 'GMT-08:00' },
  { id: 'America/Anchorage', name: 'Anchorage, USA (Alaska)', abbrev: 'AKST', gmtOffsetLabel: 'GMT-09:00' },
  { id: 'Pacific/Honolulu', name: 'Honolulu, USA (Hawaii)', abbrev: 'HST', gmtOffsetLabel: 'GMT-10:00' },

  // Europe
  { id: 'Europe/London', name: 'London, UK', abbrev: 'GMT', gmtOffsetLabel: 'GMT+00:00' },
  { id: 'Europe/Dublin', name: 'Dublin, Ireland', abbrev: 'GMT', gmtOffsetLabel: 'GMT+00:00' },
  { id: 'Europe/Paris', name: 'Paris, France', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },
  { id: 'Europe/Berlin', name: 'Berlin, Germany', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },
  { id: 'Europe/Zurich', name: 'Zurich, Switzerland', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },
  { id: 'Europe/Amsterdam', name: 'Amsterdam, Netherlands', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },
  { id: 'Europe/Rome', name: 'Rome, Italy', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },
  { id: 'Europe/Madrid', name: 'Madrid, Spain', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },

  // Asia
  { id: 'Asia/Kolkata', name: 'New Delhi, India', abbrev: 'IST', gmtOffsetLabel: 'GMT+05:30' },

  // Australia
  { id: 'Australia/Perth', name: 'Perth, Australia (Western)', abbrev: 'AWST', gmtOffsetLabel: 'GMT+08:00' },
  { id: 'Australia/Adelaide', name: 'Adelaide, Australia (Central)', abbrev: 'ACST', gmtOffsetLabel: 'GMT+09:30' },
  { id: 'Australia/Brisbane', name: 'Brisbane, Australia (Eastern)', abbrev: 'AEST', gmtOffsetLabel: 'GMT+10:00' },
  { id: 'Australia/Sydney', name: 'Sydney, Australia (Eastern)', abbrev: 'AEST', gmtOffsetLabel: 'GMT+10:00' },
  { id: 'Australia/Melbourne', name: 'Melbourne, Australia (Eastern)', abbrev: 'AEST', gmtOffsetLabel: 'GMT+10:00' },
];

export const DEFAULT_MEETING_DURATION = 30; // minutes