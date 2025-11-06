import BottomNavigation from '@/components/common/BottomNavigation';
import SearchFieldSection from './components/SearchFieldSection';
import GroupListSection from './components/GroupListSection';
import styled from '@emotion/styled';
import OptionButton from './components/OptionButton';
import { useQuery } from '@tanstack/react-query';
import { fetchGroups } from '@/api/groupApi';
import { useSearch } from './hooks/useSearch';
import useScrollStore from '@/stores/useScrollStore';
import { useEffect, useRef } from 'react';

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const homeScrollPosition = useScrollStore((state) => state.homeScrollPosition);
  const setHomeScrollPosition = useScrollStore((state) => state.setHomeScrollPosition);

  // 컴포넌트 마운트 시 저장된 스크롤 위치로 복원
  useEffect(() => {
    if (scrollRef.current && homeScrollPosition > 0) {
      scrollRef.current.scrollTop = homeScrollPosition;
    }
  }, [homeScrollPosition]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (scrollRef.current) {
      setHomeScrollPosition(scrollRef.current.scrollTop);
    }
  };

  return (
    <PageContainer>
      <SearchFieldSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <GroupListWrapper ref={scrollRef} onScroll={handleScroll}>
        <GroupListSection groups={filteredGroups} isLoading={isLoading} isError={isError} />
      </GroupListWrapper>
      <BottomNavigation />
      <OptionButton />
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
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
`;
