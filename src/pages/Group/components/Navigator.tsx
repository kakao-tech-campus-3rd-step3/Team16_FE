import styled from '@emotion/styled';
import { useGroupMembership } from '@/hooks/useGroupMembership';
import { useParams } from 'react-router-dom';

interface NavigatorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigator = ({ activeTab, onTabChange }: NavigatorProps) => {
  const { groupId } = useParams();
  const { isMember, isLoading } = useGroupMembership(groupId);

  if (isLoading) {
    return null;
  }

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
  position: 'sticky',
  top: '45px',
  width: '100%',
  height: '2.75rem',
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
