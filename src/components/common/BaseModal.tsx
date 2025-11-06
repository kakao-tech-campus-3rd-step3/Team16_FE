import { useEffect, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

type ModalVariant = 'center' | 'bottom';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: ModalVariant;
  maxWidth?: number;
  overlayOpacity?: number;
}

const BaseModal = ({
  isOpen,
  onClose,
  children,
  variant = 'center',
  maxWidth = 480,
  overlayOpacity = 0.4,
}: BaseModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    // 스크롤 잠금
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // ESC 키로 모달 닫기
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} style={{ background: `rgba(0,0,0,${overlayOpacity})` }}>
      <Content variant={variant} maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        {/* <Inner>{children}</Inner> */}
        {children}
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
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  transition: 'background 0.1s ease',
  pointerEvents: 'auto', // 모달 오버레이는 클릭 가능하게
});

const Content = styled.div<{ variant: ModalVariant; maxWidth: number }>(
  ({ variant, maxWidth }) => ({
    ...(variant === 'center' && { background: 'rgba(0,0,0,0.4)' }),
    borderRadius: variant === 'bottom' ? '12px 12px 0 0' : '8px',
    width: '100%',
    maxWidth: variant === 'bottom' ? '720px' : `${maxWidth}px`,
    animation: variant === 'bottom' ? `${slideUp} 0.3s ease` : `${fadeIn} 0.2s ease`,
    pointerEvents: 'auto', // 모달 내용도 클릭 가능하게
    ...(variant === 'bottom'
      ? {
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }
      : {
          margin: '0 auto',
        }),
  })
);

// const Inner = styled.div({
//   padding: spacing.spacing4,
//   boxSizing: 'border-box',
//   width: '100%',
// });
