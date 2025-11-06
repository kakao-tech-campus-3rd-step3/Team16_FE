import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import type { AttendeeSectionProps, Attendee } from '../type';
import { formatAttendanceTime } from '../utils/timeUtils';

const getStatusColor = (status: Attendee['attendStatus']) => {
  switch (status) {
    case 'PRESENT':
      return '#22c55e'; // 초록색
    case 'LATE':
      return '#f97316'; // 주황색
    case 'ABSENT':
      return '#ef4444'; // 빨간색
    case 'PENDING':
      return colors.gray400; // 회색
    default:
      return colors.gray600;
  }
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const AttendeeList = styled.div({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  alignItems: 'center',
  gap: '30px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
});

const Time = styled.span<{ status: Attendee['attendStatus'] }>(({ status }) => ({
  ...typography.h2,
  color: getStatusColor(status),
}));

const Name = styled.span<{ status: Attendee['attendStatus'] }>(({ status }) => ({
  ...typography.h3,
  color: getStatusColor(status),
  textDecoration: status === 'ABSENT' ? 'line-through' : 'none',
}));

const AttendeeSection = ({ attendees, startTime }: AttendeeSectionProps) => {
  return (
    <Wrapper>
      {attendees.map((attendee, index) => (
        <AttendeeList key={index}>
          {attendee.attendStatus !== 'PENDING' && attendee.attendStatus !== 'ABSENT' && (
            <Time status={attendee.attendStatus}>
              {formatAttendanceTime(attendee.attendAt, startTime)}
            </Time>
          )}
          <Name status={attendee.attendStatus}>{attendee.userName}</Name>
        </AttendeeList>
      ))}
    </Wrapper>
  );
};

export default AttendeeSection;
