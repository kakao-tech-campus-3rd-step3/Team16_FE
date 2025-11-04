import BottomNavigation from '@/components/common/BottomNavigation';
import SearchFieldSection from './components/SearchFieldSection';
import GroupListSection from './components/GroupListSection';
import styled from '@emotion/styled';
import CreateGroupButton from './components/CreateGroupButton';
import { useQuery } from '@tanstack/react-query';
import { fetchGroups } from '@/api/groupApi';
import { useSearch } from './hooks/useSearch';

const HomePage = () => {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  });

  const { searchQuery, setSearchQuery, filteredGroups } = useSearch(groups);

  return (
    <PageContainer>
      <SearchFieldSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <GroupListWrapper>
        <GroupListSection groups={filteredGroups} isLoading={isLoading} isError={isError} />
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
