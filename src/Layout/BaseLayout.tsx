import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Header } from '@/components/common/Header';
import useHeaderStore from '@/stores/useHeaderStore';

type Props = {
  maxWidth?: number;
  children: ReactNode;
};

export const BaseLayout = ({ maxWidth = 720, children }: Props) => {
  const { leftContent, centerContent, rightContent } = useHeaderStore();
  const hasHeader = !!(leftContent || centerContent || rightContent);

  return (
    <Wrapper>
      {hasHeader && (
        <FixedHeader maxWidth={maxWidth}>
          <Header />
        </FixedHeader>
      )}
      <Container maxWidth={maxWidth} hasHeader={hasHeader}>
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: theme.colors.gray100,
}));

const FixedHeader = styled.div<{ maxWidth: number }>(({ maxWidth }) => ({
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
  maxWidth: `${maxWidth}px`,
  width: '100%',
  zIndex: 1000,
  position: 'fixed',
}));

type ContainerProps = {
  maxWidth?: number;
  hasHeader?: boolean;
};
const Container = styled.main<ContainerProps>(({ maxWidth, hasHeader, theme }) => ({
  maxWidth: `${maxWidth}px`,
  width: '100%',
  minHeight: hasHeader ? 'calc(100vh - 3rem)' : '100vh',
  backgroundColor: theme.colors.white,
  paddingTop: hasHeader ? '3rem' : '0',
  position: 'relative',
  margin: '0 auto',
}));
