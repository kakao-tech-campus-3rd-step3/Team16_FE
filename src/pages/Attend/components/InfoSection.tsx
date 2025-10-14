import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

interface InfoSectionProps {
  location: string | undefined;
  startTime: string | undefined;
  planTitle: string | undefined;
}

const InfoSection = ({ location, startTime, planTitle }: InfoSectionProps) => {
  return (
    <Wrapper>
      <Header>{planTitle}</Header>
      <Date>{startTime}</Date>
      <Location>{location}</Location>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  padding: '20px',
  textAlign: 'center',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
});

const Header = styled.h2({
  ...typography.h2,
  marginBottom: '8px',
});

const Date = styled.p({
  ...typography.body,
  color: colors.gray600,
});

const Location = styled.p({
  ...typography.body,
  color: colors.gray600,
});

export default InfoSection;
