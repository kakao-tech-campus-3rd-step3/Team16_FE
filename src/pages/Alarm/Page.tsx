import { useHeader } from '@/hooks/useHeader';
import AlarmList from './components/AlarmList';
import styled from '@emotion/styled';

const AlarmPage = () => {
  useHeader({ centerContent: '알림' });
  return (
    <PageContainer>
      <ListContainer>
        <AlarmList />
      </ListContainer>
    </PageContainer>
  );
};

export default AlarmPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  background-color: white;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
`;
