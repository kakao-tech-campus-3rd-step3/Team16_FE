import styled from '@emotion/styled';
import { GoBellFill } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface SearchFieldSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchFieldSection = ({ searchQuery, setSearchQuery }: SearchFieldSectionProps) => {
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <SearchIcon />
        <SearchField
          placeholder="모임을 검색해보세요"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
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

const SearchContainer = styled.div(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIcon = styled(IoSearch)(({ theme }) => ({
  position: 'absolute',
  left: '16px',
  fontSize: '20px',
  color: theme.colors.gray500,
  pointerEvents: 'none',
}));

const SearchField = styled.input(({ theme }) => ({
  width: '100%',
  height: '44px',
  borderRadius: '22px',
  border: 'none',
  backgroundColor: theme.colors.gray100,
  paddingLeft: '48px',
  paddingRight: '16px',
  fontSize: '16px',
  transition: 'all 0.2s ease',
  '&:focus': {
    outline: 'none',
    backgroundColor: 'white',
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },
  '&::placeholder': {
    color: theme.colors.gray400,
  },
}));

const BellIcon = styled(GoBellFill)(({ theme }) => ({
  color: theme.colors.primaryDark,
  cursor: 'pointer',
  fontSize: '32px',
}));
