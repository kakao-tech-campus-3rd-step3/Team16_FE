import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import type { AttendeeSectionProps } from '../type';

const AttendeeSection = ({ attendees }: AttendeeSectionProps) => {
  return (
    <Wrapper>
      {attendees.map((attendee, index) => (
        <AttendeeList key={index}>
          <Time>{attendee.attendAt}</Time>
          <Name>{attendee.userName}</Name>
        </AttendeeList>
      ))}
    </Wrapper>
  );
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

const Time = styled.span({
  ...typography.h2,
});

const Name = styled.span({
  ...typography.body,
  color: colors.gray600,
});

export default AttendeeSection;
