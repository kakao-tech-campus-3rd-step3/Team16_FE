import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

const TAG_COLORS: Record<string, { bg: string; border: string }> = {
  안전: { bg: colors.primaryLight, border: colors.primary },
  주의: { bg: colors.warningLight, border: colors.warning },
  위험: { bg: colors.errorLight, border: colors.error },
};

type TagBadgeProps = {
  tag: keyof typeof TAG_COLORS | string;
};

const TagBadge = ({ tag }: TagBadgeProps) => {
  return <Badge tag={tag}>{tag}</Badge>;
};

export default TagBadge;

const Badge = styled.span<{ tag: string }>(({ tag, theme }) => {
  const color = TAG_COLORS[tag] || {
    bg: colors.gray100,
    text: colors.gray600,
    border: colors.gray300,
  };
  return {
    ...theme.typography.small,
    borderRadius: '16px',
    padding: '4px 6px',
    backgroundColor: color.bg,
    border: `1px solid ${color.border}`,
    lineHeight: 1,
  };
});
