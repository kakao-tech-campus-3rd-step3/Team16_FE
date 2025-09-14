import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const InfoSection = () => {
  return (
    <Wrapper>
      <Header>27회 정기모임</Header>
      <Date>2024년 6월 15일 토요일</Date>
      <Location>서울시 강남구</Location>
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
