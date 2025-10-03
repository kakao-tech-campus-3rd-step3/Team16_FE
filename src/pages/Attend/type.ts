export interface Attendee {
  userName: string;
  attendStatus: 'PRESENT' | 'ABSENT';
  attendAt: string;
}

export interface AttendanceResponse {
  attendees: Attendee[];
  isUserAttended: boolean;
}

export interface AttendeeSectionProps {
  attendees: Attendee[];
}
