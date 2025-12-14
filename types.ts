export interface TimeZone {
  id: string;
  name: string;
  abbrev: string; // e.g., IST, EST
  gmtOffsetLabel: string; // e.g., GMT+05:30
}

export interface MeetingDetails {
  topic: string;
  durationMinutes: number;
}

export interface AiResponse {
  agenda: string;
  etiquetteTip: string;
}