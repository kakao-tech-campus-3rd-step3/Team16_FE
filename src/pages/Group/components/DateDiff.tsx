import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const DateDiff = ({ date }: { date: string }) => {
  const text = calDateDiff(date);
  return <Wrapper text={text}>{text}</Wrapper>;
};

const calDateDiff = (date: string) => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  let text = '';
  if (diffDay >= 1) {
    text = `${diffDay}일 전`;
  } else if (diffHour >= 1) {
    text = `${diffHour}시간 전`;
  } else if (diffMin >= 1) {
    text = `${diffMin}분 전`;
  }
  if (text === '') {
    text = '진행 중';
  }
  return text;
};

const Wrapper = styled.div(({ text }: { text: string }) => ({
  ...typography.body,
  color: text === '진행 중' ? colors.primary : colors.gray500,
}));

export default DateDiff;
