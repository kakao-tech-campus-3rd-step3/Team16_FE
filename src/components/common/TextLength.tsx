import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';

interface TextLengthValidatorProps {
  currentLength: number;
  maxLength: number;
}

const TextLength = ({ currentLength, maxLength }: TextLengthValidatorProps) => {
  return (
    <CounterText>
      {currentLength}/{maxLength}
    </CounterText>
  );
};

const CounterText = styled.span({
  ...typography.caption,
  color: colors.gray600,
  marginLeft: 'auto', // 항상 오른쪽 끝으로
});

export default TextLength;
