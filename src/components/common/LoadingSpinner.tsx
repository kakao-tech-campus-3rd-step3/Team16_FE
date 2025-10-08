import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

const FullScreenLoader = () => {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
};

export default FullScreenLoader;

export const CenteredLoader = () => {
  return (
    <CenterContainer>
      <Spinner />
    </CenterContainer>
  );
};

const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});

const CenterContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Spinner = styled.div({
  width: 48,
  height: 48,
  border: `6px solid ${colors.gray200}`,
  borderTop: `6px solid ${colors.primary}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});
