import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

interface PostingStatusProps {
  text?: string;
  className?: string;
}

const PostingStatus = ({ text = '게시중', className }: PostingStatusProps) => {
  return (
    <Container className={className}>
      {text}
      <BouncingDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </BouncingDots>
    </Container>
  );
};

// 바운스 애니메이션
const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(4px);
  }
`;

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  ...typography.body,
  fontSize: '11px',
  color: colors.primary,
  fontWeight: 600,
});

const BouncingDots = styled.span({
  display: 'inline-flex',
  gap: '2px',
});

const Dot = styled.span<{ delay: number }>(({ delay }) => ({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: colors.primary,
  display: 'inline-block',
  animation: `${bounce} 1.4s infinite ease-in-out`,
  animationDelay: `${delay}s`,
}));

export default PostingStatus;
