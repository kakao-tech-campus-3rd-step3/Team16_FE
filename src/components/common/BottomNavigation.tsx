import { GoHome, GoSearch, GoPerson } from 'react-icons/go';
import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router';

const navItems = [
  { icon: GoHome, label: '홈', path: '/' },
  { icon: GoSearch, label: '피드', path: '/' },
  { icon: GoPerson, label: '마이페이지', path: '/mypage' },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <BottomNavigationContainer>
      {navItems.map(({ icon: Icon, label, path }) => (
        <NavItem
          key={label}
          isActive={location.pathname === path && label !== '피드'}
          onClick={() => handleNavigation(path)}
        >
          <Icon size={20} />
          <NavText isActive={location.pathname === path && label !== '피드'}>{label}</NavText>
        </NavItem>
      ))}
    </BottomNavigationContainer>
  );
};

export default BottomNavigation;

const BottomNavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  max-width: 720px;
  flex-direction: row;
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 9999;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.gray600)};
`;

const NavText = styled.span<{ isActive: boolean }>(({ theme, isActive }) => ({
  ...theme.typography.caption,
  marginTop: '4px',
  color: isActive ? theme.colors.primary : theme.colors.gray500,
  fontWeight: isActive ? 1000 : theme.typography.caption.fontWeight,
}));
