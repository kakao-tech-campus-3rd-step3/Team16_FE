import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const PrimaryButton = ({ text, onClick, disabled = false }: PrimaryButtonProps) => {
  return (
    <ButtonSection>
      <Button onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </ButtonSection>
  );
};

export default PrimaryButton;

const ButtonSection = styled.section({
  display: 'flex',
  position: 'fixed',
  width: '100%',
  maxWidth: '720px',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
});

const Button = styled.button({
  padding: `${spacing.spacing4}px`,
  margin: `${spacing.spacing4}px`,
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
  '&:disabled': {
    backgroundColor: colors.primaryMidLight,
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});
