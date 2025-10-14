import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import styled from '@emotion/styled';

export const ErrorMessage = styled.span({
  ...typography.caption,
  color: colors.error,
  marginLeft: spacing.spacing1,
});
