export interface Attendee {
  userName: string;
  attendStatus: 'PRESENT' | 'LATE' | 'ABSENT' | 'HOLDING';
  attendAt: string;
}

export interface AttendanceResponse {
  attendees: Attendee[];
  isUserAttended: boolean;
}

export interface AttendeeSectionProps {
  attendees: Attendee[];
  startTime: string;
}
