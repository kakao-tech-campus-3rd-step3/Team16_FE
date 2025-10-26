import BottomNavigation from '@/components/common/BottomNavigation';
import SearchFieldSection from './components/SearchFieldSection';
import GroupListSection from './components/GroupListSection';
import styled from '@emotion/styled';
import CreateGroupButton from './components/CreateGroupButton';

const HomePage = () => {
  return (
    <PageContainer>
      <SearchFieldSection />
      <GroupListWrapper>
        <GroupListSection />
      </GroupListWrapper>
      <BottomNavigation />
      <CreateGroupButton />
    </PageContainer>
  );
};

export default HomePage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GroupListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding-bottom: 60px;
`;
