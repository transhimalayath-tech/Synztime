import { TimeZone } from './types';

export const COMMON_TIMEZONES: TimeZone[] = [
  { id: 'Asia/Kolkata', name: 'India Standard Time', abbrev: 'IST', gmtOffsetLabel: 'GMT+05:30' },
  { id: 'America/New_York', name: 'Eastern Time', abbrev: 'EST/EDT', gmtOffsetLabel: 'GMT-04:00' }, // Approximation for label, logic handles real offset
  { id: 'America/Los_Angeles', name: 'Pacific Time', abbrev: 'PST/PDT', gmtOffsetLabel: 'GMT-07:00' },
  { id: 'Europe/London', name: 'London', abbrev: 'GMT/BST', gmtOffsetLabel: 'GMT+00:00' },
  { id: 'UTC', name: 'Coordinated Universal Time', abbrev: 'UTC', gmtOffsetLabel: 'GMT+00:00' },
  { id: 'Asia/Tokyo', name: 'Japan Standard Time', abbrev: 'JST', gmtOffsetLabel: 'GMT+09:00' },
  { id: 'Australia/Sydney', name: 'Australian Eastern Time', abbrev: 'AEST', gmtOffsetLabel: 'GMT+10:00' },
  { id: 'Europe/Paris', name: 'Central European Time', abbrev: 'CET', gmtOffsetLabel: 'GMT+01:00' },
  { id: 'Asia/Dubai', name: 'Gulf Standard Time', abbrev: 'GST', gmtOffsetLabel: 'GMT+04:00' },
  { id: 'America/Chicago', name: 'Central Time', abbrev: 'CST', gmtOffsetLabel: 'GMT-05:00' },
];

export const DEFAULT_MEETING_DURATION = 30; // minutes
