import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { GiCrackedShield } from 'react-icons/gi';
import { RiShieldLine } from 'react-icons/ri';
import { IoShieldHalfSharp, IoShieldCheckmarkSharp } from 'react-icons/io5';

interface ScoreSectionProps {
  userScore: number;
}

const ScoreSection = ({ userScore }: ScoreSectionProps) => {
  // 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#079c83'; // 청록색
    if (score >= 60) return colors.primaryDark; // Orange
    if (score >= 30) return colors.primary; // DarkOrange
    return '#FF4500'; // OrangeRed
  };

  // 점수에 따른 아이콘
  const getScoreIcon = (score: number) => {
    const color = getScoreColor(score);
    if (score >= 80) return <IoShieldCheckmarkSharp color={color} size={20} />; // 튼튼한 방패
    if (score >= 60) return <IoShieldHalfSharp color={color} size={20} />; // 반방패
    if (score >= 40) return <RiShieldLine color={color} size={20} />; // 테두리 방패
    return <GiCrackedShield color={color} size={20} />; // 깨진 방패
  };

  return (
    <Wrapper>
      <TitleRow>
        <Title>신뢰 지수</Title>
        <ScoreInfo>
          <ScoreText color={getScoreColor(userScore)}>{userScore.toFixed(1)}점</ScoreText>
          <ScoreIconWrapper>{getScoreIcon(userScore)}</ScoreIconWrapper>
        </ScoreInfo>
      </TitleRow>
      <ProgressBarWrapper>
        <ProgressBar width={userScore} color={getScoreColor(userScore)} />
      </ProgressBarWrapper>
    </Wrapper>
  );
};

export default ScoreSection;

const Wrapper = styled.section({
  width: '100%',
  backgroundColor: 'transparent',
});

const TitleRow = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.spacing3,
});

const Title = styled.h2({
  ...typography.h3,
  color: colors.gray900,
  fontWeight: '550',
  marginLeft: spacing.spacing1,
});

const ProgressBarWrapper = styled.div({
  width: '100%',
  height: '12px',
  backgroundColor: colors.gray200,
  borderRadius: '6px',
  overflow: 'hidden',
});

const ProgressBar = styled.div<{ width: number; color: string }>(({ width, color }) => ({
  height: '100%',
  width: `${width}%`,
  background: `linear-gradient(90deg, ${color}CC, ${color})`,
  transition: 'width 0.3s ease-in-out',
  borderRadius: '6px',
  boxShadow: `0 2px 4px ${color}40`,
}));

const ScoreInfo = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.spacing1,
  justifyContent: 'flex-start',
});

const ScoreText = styled.span<{ color: string }>(({ color }) => ({
  ...typography.h2,
  color,
  fontWeight: 'bold',
}));

const ScoreIconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
