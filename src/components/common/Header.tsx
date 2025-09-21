import { typography } from '@/styles/typography';
import styled from '@emotion/styled';
import useHeaderStore from '@/stores/useHeaderStore';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { left, center, right } = useHeaderStore();
  const navigate = useNavigate();

  const defaultLeft = (
    <HiOutlineChevronLeft size={20} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
  );

  if (!left && !center && !right) return null;

  const leftNode = left === null ? null : (left ?? defaultLeft);

  return (
    <Wrapper>
      <Section>{leftNode}</Section>
      <CenterSection>{center}</CenterSection>
      <Section>{right}</Section>
    </Wrapper>
  );
};

const Wrapper = styled.header(({ theme }) => ({
  height: '2.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.white,
  borderBottom: `1px solid ${theme.colors.gray200}`,
  padding: `0 ${theme.spacing.spacing4}px`,
}));

const Section = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: '2.5rem',
  justifyContent: 'flex-start',
  '&:last-of-type': {
    justifyContent: 'flex-end',
  },
});

const CenterSection = styled.div({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  ...typography.h3,
});
