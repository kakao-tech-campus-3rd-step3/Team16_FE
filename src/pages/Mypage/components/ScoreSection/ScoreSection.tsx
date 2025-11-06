import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { GiCrackedShield } from 'react-icons/gi';
import {
  IoShieldHalfSharp,
  IoShieldCheckmarkSharp,
  IoInformationCircleOutline,
} from 'react-icons/io5';
import { LuShieldAlert } from 'react-icons/lu';
import { useState } from 'react';

interface ScoreSectionProps {
  userScore: number;
}

const ScoreSection = ({ userScore }: ScoreSectionProps) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  // 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#079c83'; // 청록색
    if (score >= 75) return colors.primary; // 안전
    if (score >= 63) return colors.warning; // 주의
    return colors.error; // 위험
  };

  // 점수에 따른 아이콘
  const getScoreIcon = (score: number) => {
    const color = getScoreColor(score);
    if (score >= 90) return <IoShieldCheckmarkSharp color={color} size={20} />; // 튼튼한 방패
    if (score >= 75) return <IoShieldHalfSharp color={color} size={20} />; // 반방패
    if (score >= 63) return <LuShieldAlert color={color} size={20} />; // 주의 방패
    return <GiCrackedShield color={color} size={20} />; // 깨진 방패
  };

  return (
    <Wrapper>
      <TitleRow>
        <TitleWrapper>
          <Title>신뢰 지수</Title>
          <InfoIcon onClick={() => setShowInfoModal(true)}>
            <IoInformationCircleOutline size={20} />
          </InfoIcon>
        </TitleWrapper>
        <ScoreInfo>
          <ScoreText color={getScoreColor(userScore)}>{userScore.toFixed(1)}점</ScoreText>
          <ScoreIconWrapper>{getScoreIcon(userScore)}</ScoreIconWrapper>
        </ScoreInfo>
      </TitleRow>
      <ProgressBarWrapper>
        <ProgressBar width={userScore} color={getScoreColor(userScore)} />
      </ProgressBarWrapper>

      {showInfoModal && (
        <>
          <ModalOverlay onClick={() => setShowInfoModal(false)} />
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>신뢰 지수란?</ModalTitle>
              <CloseButton onClick={() => setShowInfoModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalContent>
              <InfoSection>
                <InfoTitle>신뢰 지수는 모임 혹은 개인의 신뢰도를 나타냅니다</InfoTitle>
                <InfoText>
                  게시글 작성, 댓글 작성, 모임 출석, 신고 등을 종합하여 계산됩니다.
                </InfoText>
              </InfoSection>
              <ScoreLevelSection>
                <LevelItem>
                  <LevelIcon>
                    <IoShieldCheckmarkSharp color="#079c83" size={24} />
                  </LevelIcon>
                  <LevelInfo>
                    <LevelTitle color="#079c83">90점 이상 - 튼튼함</LevelTitle>
                    <LevelDesc>매우 신뢰할 수 있습니다</LevelDesc>
                  </LevelInfo>
                </LevelItem>
                <LevelItem>
                  <LevelIcon>
                    <IoShieldHalfSharp color={colors.primary} size={24} />
                  </LevelIcon>
                  <LevelInfo>
                    <LevelTitle color={colors.primary}>73~89점 - 안전</LevelTitle>
                    <LevelDesc>신뢰할 수 있습니다</LevelDesc>
                  </LevelInfo>
                </LevelItem>
                <LevelItem>
                  <LevelIcon>
                    <LuShieldAlert color={colors.warning} size={24} />
                  </LevelIcon>
                  <LevelInfo>
                    <LevelTitle color={colors.warning}>46~72점 - 주의</LevelTitle>
                    <LevelDesc>주의가 필요합니다</LevelDesc>
                  </LevelInfo>
                </LevelItem>
                <LevelItem>
                  <LevelIcon>
                    <GiCrackedShield color={colors.error} size={24} />
                  </LevelIcon>
                  <LevelInfo>
                    <LevelTitle color={colors.error}>45점 이하 - 위험</LevelTitle>
                    <LevelDesc>굉장히 위험합니다</LevelDesc>
                  </LevelInfo>
                </LevelItem>
              </ScoreLevelSection>
            </ModalContent>
          </ModalContainer>
        </>
      )}
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

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.spacing1,
});

const Title = styled.h2({
  ...typography.h3,
  color: colors.gray900,
  fontWeight: '550',
  marginLeft: spacing.spacing1,
});

const InfoIcon = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: colors.gray500,
  padding: 0,
  '&:hover': {
    color: colors.primary,
  },
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

const ModalOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
});

const ModalContainer = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: colors.white,
  borderRadius: '16px',
  width: '90%',
  maxWidth: '400px',
  maxHeight: '80vh',
  overflow: 'auto',
  zIndex: 1001,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
});

const ModalHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: spacing.spacing4,
  borderBottom: `1px solid ${colors.gray200}`,
});

const ModalTitle = styled.h3({
  ...typography.h2,
  color: colors.black,
});

const CloseButton = styled.button({
  background: 'none',
  border: 'none',
  fontSize: '32px',
  cursor: 'pointer',
  color: colors.gray600,
  padding: 0,
  lineHeight: 1,
  '&:hover': {
    color: colors.black,
  },
});

const ModalContent = styled.div({
  padding: spacing.spacing4,
});

const InfoSection = styled.div({
  marginBottom: spacing.spacing4,
});

const InfoTitle = styled.h4({
  ...typography.h3,
  color: colors.black,
  marginBottom: spacing.spacing2,
});

const InfoText = styled.p({
  ...typography.body,
  color: colors.gray700,
  lineHeight: 1.6,
});

const ScoreLevelSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing3,
});

const LevelItem = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.spacing2,
});

const LevelIcon = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const LevelInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing1,
});

const LevelTitle = styled.span<{ color: string }>(({ color }) => ({
  ...typography.body,
  fontWeight: 'bold',
  color,
}));

const LevelDesc = styled.span({
  ...typography.small,
  color: colors.gray600,
});
