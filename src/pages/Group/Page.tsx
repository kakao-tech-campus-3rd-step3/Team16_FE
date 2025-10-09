import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GroupHome from './GroupHomePage';
import GroupBoard from './GroupBoardPage';
import Nav from './components/Navigator';
import styled from '@emotion/styled';
import { useHeader } from '@/hooks/useHeader';
import { DashBoard } from './GroupDashBoardPage';
import useGroupHome from '@/hooks/useGroupHome';
import { useGroupMembershipStatus } from '@/hooks/useGroupMembershipStatus';

const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  const { data: group, isLoading: groupLoading } = useGroupHome(Number(groupId));
  const groupName = group?.name;

  const { isMember, isLoading } = useGroupMembershipStatus();

  useEffect(() => {
    if (groupLoading || isLoading) return;
    const stateTab = location.state?.activeTab;
    if (stateTab) {
      setActiveTab(stateTab);
    } else {
      setActiveTab(isMember ? '대시보드' : '홈');
    }
  }, [location.state?.activeTab, isMember, isLoading, groupLoading]);

  useHeader({ centerContent: groupName });

  if (groupLoading || isLoading) return null;

  const renderContent = () => {
    switch (activeTab) {
      case '대시보드':
        return isMember ? <DashBoard /> : <GroupHome />;
      case '홈':
        return <GroupHome />;
      case '게시판':
        return <GroupBoard />;
      case '채팅':
        return isMember ? <div>채팅 컴포넌트 (구현 예정)</div> : <GroupHome />;
      default:
        return <GroupHome />;
    }
  };

  return (
    <Wrapper>
      <Nav activeTab={activeTab} onTabChange={setActiveTab} isMember={isMember} />
      {renderContent()}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  paddingTop: '2.5rem',
});

export default GroupPage;
