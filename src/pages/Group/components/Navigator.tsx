import styled from '@emotion/styled';

interface NavigatorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMember: boolean;
}

const Navigator = ({ activeTab, onTabChange, isMember }: NavigatorProps) => {
  const handleItemClick = (tab: string) => {
    onTabChange(tab);
  };

  if (isMember) {
    return (
      <Nav>
        <Item isActive={activeTab === '대시보드'} onClick={() => handleItemClick('대시보드')}>
          대시보드
        </Item>
        <Item isActive={activeTab === '게시판'} onClick={() => handleItemClick('게시판')}>
          게시판
        </Item>
        <Item isActive={activeTab === '채팅'} onClick={() => handleItemClick('채팅')}>
          채팅
        </Item>
      </Nav>
    );
  }

  return (
    <Nav>
      <Item isActive={activeTab === '홈'} onClick={() => handleItemClick('홈')}>
        홈
      </Item>
      <Item isActive={activeTab === '게시판'} onClick={() => handleItemClick('게시판')}>
        게시판
      </Item>
    </Nav>
  );
};

const Nav = styled.nav({
  position: 'fixed',
  top: '45px',
  width: '100%',
  height: '2.75rem',
  maxWidth: '720px',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'white',
});

const Item = styled.div<{ isActive?: boolean }>(({ isActive }) => ({
  flex: 1,
  textAlign: 'center',
  padding: '12px 5px',
  cursor: 'pointer',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: isActive ? '2px solid black' : 'none',
}));

export default Navigator;
