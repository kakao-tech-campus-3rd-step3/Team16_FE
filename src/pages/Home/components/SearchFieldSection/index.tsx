import styled from '@emotion/styled';
import { GoBellFill } from 'react-icons/go';

const SearchFieldSection = () => {
  return (
    <Wrapper>
      <SearchField></SearchField>
      <GoBellFill size={32} />
    </Wrapper>
  );
};

export default SearchFieldSection;

const Wrapper = styled.main(({ theme }) => ({
  margin: `0 ${theme.spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'row',
  marginTop: theme.spacing.spacing5,
  alignItems: 'center',
  gap: theme.spacing.spacing4,
}));

const SearchField = styled.input(({ theme }) => ({
  width: '100%',
  height: '40px',
  borderRadius: '16px',
  border: `2px solid ${theme.colors.gray300}`,
  backgroundColor: theme.colors.gray100,
  '&:focus': {
    outline: 'none',
  },
  padding: '0 16px',
}));
