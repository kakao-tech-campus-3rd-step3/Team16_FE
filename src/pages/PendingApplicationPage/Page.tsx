import ApplicationItem from './components/ApplicationItem';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useHeader } from '@/hooks/useHeader';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupApplications } from '@/api/groupApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const PendingApplicationPage = () => {
  useHeader({ centerContent: '참가신청 대기' });

  const { groupId } = useParams<{ groupId: string }>();

  const {
    data: applications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groupApplications', groupId],
    queryFn: () => fetchGroupApplications(Number(groupId)),
    enabled: !!groupId,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>신청 목록을 불러오지 못했습니다.</div>;

  return (
    <Wrapper>
      {applications?.length ? (
        applications.map((app: any) => (
          <>
            <ApplicationItem key={app.applicationId} data={app} />
            <PrimaryButton text="모두 수락하기" />
          </>
        ))
      ) : (
        <Message>대기 중인 신청이 없습니다.</Message>
      )}
    </Wrapper>
  );
};

export default PendingApplicationPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
  padding: '16px',
});

const Message = styled.div({
  color: colors.gray700,
  textAlign: 'center',
  marginTop: '32px',
});
