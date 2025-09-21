import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupHome from './GroupHomePage';
import GroupBoard from './GroupBoardPage';
import Nav from './components/Navigator';
import { useGroupMembership } from '@/hooks/useGroupMembership';
import styled from '@emotion/styled';
import { useHeader } from '@/hooks/useHeader';
import { DashBoard } from './GroupDashBoardPage';

const GroupPage = () => {
  const { groupId } = useParams();
  const { isMember, isLoading } = useGroupMembership(groupId);
  const [activeTab, setActiveTab] = useState('');

<<<<<<< HEAD
  useHeader({ center: '스터디 그룹' });
=======
  useHeader({ centerContent: '스터디 그룹' });
>>>>>>> develop

  // 멤버십 상태에 따라 초기 탭 설정
  useEffect(() => {
    if (!isLoading) {
      setActiveTab(isMember ? '대시보드' : '홈');
    }
  }, [isMember, isLoading]);

  const renderContent = () => {
    switch (activeTab) {
      case '대시보드':
        return <DashBoard />;
      case '홈':
        return <GroupHome />;
      case '게시판':
        return <GroupBoard />;
      case '채팅':
        return <div>채팅 컴포넌트 (구현 예정)</div>;
    }
  };

  if (isLoading || !activeTab) {
    return <div>로딩 중...</div>;
  }

  return (
    <Wrapper>
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </Wrapper>
  );
};

<<<<<<< HEAD
const Wrapper = styled.div({});
=======
const Wrapper = styled.div({
  paddingTop: '2.5rem',
});
>>>>>>> develop

export default GroupPage;
