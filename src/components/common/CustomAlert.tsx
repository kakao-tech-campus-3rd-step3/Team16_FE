import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { keyframes } from '@emotion/react';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  confirmText?: string;
}

const CustomAlert = ({
  isOpen,
  onClose,
  message,
  type = 'info',
  confirmText = '확인',
}: CustomAlertProps) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return colors.primary;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <AlertContainer>
        <IconWrapper color={getColor()}>
          <Icon>{getIcon()}</Icon>
        </IconWrapper>
        <Message>{message}</Message>
        <ConfirmButton onClick={onClose} color={getColor()}>
          {confirmText}
        </ConfirmButton>
      </AlertContainer>
    </>
  );
};

export default CustomAlert;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, -40%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9998,
  animation: `${fadeIn} 0.2s ease-out`,
});

const AlertContainer = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: colors.white,
  borderRadius: '16px',
  padding: spacing.spacing5,
  minWidth: '280px',
  maxWidth: '90vw',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.spacing4,
  animation: `${slideUp} 0.3s ease-out`,
});

const IconWrapper = styled.div<{ color: string }>(({ color }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: `${color}15`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.spacing2,
}));

const Icon = styled.div({
  fontSize: '32px',
  fontWeight: 'bold',
});

const Message = styled.p({
  ...typography.body,
  color: colors.gray900,
  textAlign: 'center',
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
  wordBreak: 'keep-all',
});

const ConfirmButton = styled.button<{ color: string }>(({ color }) => ({
  width: '100%',
  padding: `${spacing.spacing3} ${spacing.spacing4}`,
  backgroundColor: color,
  color: colors.white,
  border: 'none',
  borderRadius: '12px',
  ...typography.body,
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 4px 12px ${color}40`,
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));
