import { GoHome, GoSearch, GoPerson } from 'react-icons/go';
import styled from '@emotion/styled';
import { useState } from 'react';

const navItems = [
  { icon: GoHome, label: '홈' },
  { icon: GoSearch, label: '피드' },
  { icon: GoPerson, label: '마이페이지' },
];

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('홈');

  return (
    <BottomNavigationContainer>
      {navItems.map(({ icon: Icon, label }) => (
        <NavItem key={label} isActive={activeTab === label} onClick={() => setActiveTab(label)}>
          <Icon size={20} />
          <NavText isActive={activeTab === label}>{label}</NavText>
        </NavItem>
      ))}
    </BottomNavigationContainer>
  );
};

export default BottomNavigation;

const BottomNavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  flex-direction: row;
  display: flex;
  margin: 8px 0px;
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
