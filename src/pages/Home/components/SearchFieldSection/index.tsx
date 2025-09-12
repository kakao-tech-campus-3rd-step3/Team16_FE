import styled from '@emotion/styled';
import { GoBellFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const SearchFieldSection = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SearchField></SearchField>
      <BellIcon onClick={() => navigate('/alarm')} />
    </Wrapper>
  );
};

export default SearchFieldSection;

const Wrapper = styled.main(({ theme }) => ({
  margin: `${theme.spacing.spacing3}px ${theme.spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.spacing2,
}));

const SearchField = styled.input(({ theme }) => ({
  width: '100%',
  height: '36px',
  borderRadius: '16px',
  border: `2px solid ${theme.colors.gray300}`,
  backgroundColor: theme.colors.gray100,
  '&:focus': {
    outline: 'none',
  },
  padding: '0 16px',
}));

const BellIcon = styled(GoBellFill)(({ theme }) => ({
  color: theme.colors.black,
  cursor: 'pointer',
  fontSize: '32px',
}));
