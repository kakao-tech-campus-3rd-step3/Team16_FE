import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  isVisible?: boolean;
}

const CircularProgress = ({
  progress,
  size = 120,
  strokeWidth = 8,
  isVisible = true,
}: CircularProgressProps) => {
  if (!isVisible) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <ProgressContainer>
      <SvgContainer width={size} height={size}>
        {/* 배경 원 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={colors.gray200}
          fill="transparent"
        />
        {/* 진행률 원 */}
        <ProgressCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={colors.primary}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </SvgContainer>
      <ProgressPercentage>{progress}%</ProgressPercentage>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const SvgContainer = styled.svg({
  transform: 'rotate(-90deg)', // 12시 방향부터 시작하도록 회전
});

const Circle = styled.circle({
  transition: 'stroke-dashoffset 0.3s ease',
});

const ProgressCircle = styled.circle({
  transition: 'stroke-dashoffset 0.3s ease',
  strokeLinecap: 'round',
});

const ProgressPercentage = styled.div({
  ...typography.h2,
  color: colors.gray800,
  fontWeight: 'bold',
  position: 'absolute',
});

export default CircularProgress;
