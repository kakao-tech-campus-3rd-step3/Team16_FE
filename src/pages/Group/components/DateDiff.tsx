import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const SEC_MS = 1000;
const MIN_MS = SEC_MS * 60;
const HOUR_MS = MIN_MS * 60;
const DAY_MS = HOUR_MS * 24;

const DateDiff = ({ date }: { date: string }) => {
  const text = calDateDiff(date);
  return <Wrapper text={text}>{text}</Wrapper>;
};

const calDateDiff = (date: string) => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const diffMin = Math.floor(diffMs / MIN_MS);
  const diffHour = Math.floor(diffMs / HOUR_MS);
  const diffDay = Math.floor(diffMs / DAY_MS);
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
