import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const AttendeeSection = () => {
  const attendees = [
    { name: '홍길동', time: '10:00' },
    { name: '김철수', time: '10:05' },
    { name: '이영희', time: '10:10' },
  ];

  return (
    <Wrapper>
      {attendees.map((attendee, index) => (
        <AttendeeList key={index}>
          <Time>{attendee.time}</Time>
          <Name>{attendee.name}</Name>
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
