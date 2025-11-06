import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
      // 주기적으로 업데이트 체크 (1시간마다)
      if (r) {
        setInterval(
          () => {
            r.update();
          },
          60 * 60 * 1000
        );
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowPrompt(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setNeedRefresh(false);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <PromptOverlay>
      <PromptContainer>
        <PromptTitle>새로운 버전이 있습니다! 🎉</PromptTitle>
        <PromptMessage>최신 기능과 개선사항을 사용하시려면 업데이트를 진행해주세요.</PromptMessage>
        <ButtonGroup>
          <UpdateButton onClick={handleUpdate}>업데이트</UpdateButton>
          <DismissButton onClick={handleDismiss}>나중에</DismissButton>
        </ButtonGroup>
      </PromptContainer>
    </PromptOverlay>
  );
};

export default PWAUpdatePrompt;

const PromptOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '20px',
});

const PromptContainer = styled.div({
  backgroundColor: colors.white,
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
});

const PromptTitle = styled.h2({
  ...typography.h2,
  marginBottom: '12px',
  color: colors.black,
});

const PromptMessage = styled.p({
  ...typography.body,
  color: colors.gray700,
  marginBottom: '20px',
});

const ButtonGroup = styled.div({
  display: 'flex',
  gap: '12px',
});

const UpdateButton = styled.button({
  ...typography.body,
  flex: 1,
  padding: '12px 20px',
  backgroundColor: colors.primary,
  color: colors.white,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  '&:hover': {
    opacity: 0.9,
  },
});

const DismissButton = styled.button({
  ...typography.body,
  flex: 1,
  padding: '12px 20px',
  backgroundColor: colors.gray200,
  color: colors.black,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: colors.gray300,
  },
});
