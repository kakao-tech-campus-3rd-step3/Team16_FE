import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { GiCrackedShield } from 'react-icons/gi';
import { IoShieldHalfSharp, IoShieldCheckmarkSharp } from 'react-icons/io5';
import { LuShieldAlert } from 'react-icons/lu';

type TagBadgeProps = {
  score: number;
};

const TagBadge = ({ score }: TagBadgeProps) => {
  // 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#079c83'; // 청록색 - 튼튼함
    if (score >= 75) return colors.primary; // 파란색 - 안전
    if (score >= 63) return colors.warning; // 노란색 - 주의
    return colors.error; // 빨간색 - 위험
  };

  // 점수에 따른 텍스트
  const getScoreText = (score: number) => {
    if (score >= 90) return '튼튼함';
    if (score >= 75) return '안전';
    if (score >= 63) return '주의';
    return '위험';
  };

  // 점수에 따른 아이콘
  const getScoreIcon = (score: number) => {
    const color = getScoreColor(score);
    if (score >= 90) return <IoShieldCheckmarkSharp color={color} size={16} />; // 튼튼한 방패
    if (score >= 75) return <IoShieldHalfSharp color={color} size={16} />; // 반방패
    if (score >= 63) return <LuShieldAlert color={color} size={16} />; // 주의 방패
    return <GiCrackedShield color={color} size={16} />; // 깨진 방패
  };

  return (
    <BadgeWrapper>
      <IconWrapper>{getScoreIcon(score)}</IconWrapper>
      <BadgeText color={getScoreColor(score)}>{getScoreText(score)}</BadgeText>
    </BadgeWrapper>
  );
};

export default TagBadge;

const BadgeWrapper = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
});

const IconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const BadgeText = styled.span<{ color: string }>(({ color, theme }) => ({
  ...theme.typography.small,
  color: color,
  fontWeight: '500',
  lineHeight: 1,
}));
