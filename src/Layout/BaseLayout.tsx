import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type Props = {
  maxWidth?: number;
  header?: ReactNode;
  children: ReactNode;
};

export const BaseLayout = ({ maxWidth = 720, header, children }: Props) => {
  return (
    <Wrapper>
      {header && <FixedHeader maxWidth={maxWidth}>{header}</FixedHeader>}
      <Container maxWidth={maxWidth} hasHeader={!!header}>
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
  backgroundColor: theme.colors.scale.gray100,
}));

const FixedHeader = styled.div<{ maxWidth: number }>(({ maxWidth, theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
  maxWidth: `${maxWidth}px`,
  width: '100%',
  backgroundColor: theme.colors.semantic.background.default,
  zIndex: 1000,
}));

type ContainerProps = {
  maxWidth?: number;
  hasHeader?: boolean;
};
const Container = styled.div<ContainerProps>(({ maxWidth, hasHeader, theme }) => ({
  maxWidth: `${maxWidth}px`,
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  backgroundColor: theme.colors.semantic.background.default,
  paddingTop: hasHeader ? '2.75rem' : '0',
}));
