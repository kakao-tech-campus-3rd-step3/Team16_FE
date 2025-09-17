import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import { keyframes } from '@emotion/react';

type ModalVariant = 'center' | 'bottom';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: ModalVariant;
  maxWidth?: number;
}

const BaseModal = ({
  isOpen,
  onClose,
  children,
  variant = 'center',
  maxWidth = 480,
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Content variant={variant} maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        <Inner>{children}</Inner>
      </Content>
    </Overlay>
  );
};

export default BaseModal;

const slideUp = keyframes({
  from: { transform: 'translateX(-50%) translateY(100%)' },
  to: { transform: 'translateX(-50%) translateY(0)' },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const Overlay = styled.div({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
});

const Content = styled.div<{ variant: ModalVariant; maxWidth: number }>(
  ({ variant, maxWidth }) => ({
    background: colors.white,
    borderRadius: variant === 'bottom' ? '12px 12px 0 0' : '8px',
    width: '100%',
    maxWidth: variant === 'bottom' ? '720px' : `${maxWidth}px`,
    animation: variant === 'bottom' ? `${slideUp} 0.3s ease` : `${fadeIn} 0.2s ease`,
    ...(variant === 'bottom'
      ? {
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }
      : {
          margin: '0 auto',
        }),
  })
);

const Inner = styled.div({
  padding: spacing.spacing4,
  boxSizing: 'border-box',
  width: '100%',
});
