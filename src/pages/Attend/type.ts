export interface Attendee {
  userName: string;
  attendStatus: 'PRESENT' | 'LATE' | 'ABSENT' | 'PENDING';
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
