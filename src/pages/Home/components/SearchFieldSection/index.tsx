import styled from '@emotion/styled';
import { GoBellFill } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

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

const Wrapper = styled.main({
  margin: `${spacing.spacing3}px ${spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.spacing2,
});

const SearchContainer = styled.div({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

const SearchIcon = styled(IoSearch)({
  position: 'absolute',
  left: '16px',
  fontSize: '20px',
  color: colors.gray500,
  pointerEvents: 'none',
});

const SearchField = styled.input({
  width: '100%',
  height: '44px',
  borderRadius: '22px',
  border: 'none',
  backgroundColor: colors.gray100,
  paddingLeft: '48px',
  paddingRight: '16px',
  fontSize: '16px',
  transition: 'all 0.2s ease',
  '&:focus': {
    outline: 'none',
    backgroundColor: 'white',
    boxShadow: `0 0 0 2px ${colors.primary}`,
  },
  '&::placeholder': {
    color: colors.gray400,
  },
});

const BellIcon = styled(GoBellFill)({
  color: colors.primaryDark,
  cursor: 'pointer',
  fontSize: '32px',
});
