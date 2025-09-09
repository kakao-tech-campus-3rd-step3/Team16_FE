import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
};

const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <ButtonSection>
      <Button onClick={onClick}>{text}</Button>
    </ButtonSection>
  );
};

export default PrimaryButton;

const ButtonSection = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
  margin: `${spacing.spacing4}px ${spacing.spacing4}px`,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const Button = styled.button({
  width: '100%',
  padding: `${spacing.spacing4}px ${spacing.spacing4}px`,
  border: 'none',
  borderRadius: '8px',
  backgroundColor: colors.primary,
  color: colors.white,
  ...typography.h3,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: colors.primaryDark,
  },
});
