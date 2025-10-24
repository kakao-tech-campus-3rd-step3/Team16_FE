import ApplicationItem from './components/ApplicationItem';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useHeader } from '@/hooks/useHeader';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchGroupApplications,
  approveGroupApplication,
  rejectGroupApplication,
  approveAllGroupApplications,
} from '@/api/applicantsApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

const PendingApplicationPage = () => {
  useHeader({ centerContent: '참가신청 대기' });

  const { groupId } = useParams<{ groupId: string }>();
  const queryClient = useQueryClient();

  const {
    data: applications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groupApplications', groupId],
    queryFn: () => fetchGroupApplications(Number(groupId)),
    enabled: !!groupId,
  });

  const approveMutation = useMutation({
    mutationFn: (userId: number) => approveGroupApplication(Number(groupId), userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupApplications', groupId] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (userId: number) => rejectGroupApplication(Number(groupId), userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupApplications', groupId] });
    },
  });

  const approveAllMutation = useMutation({
    mutationFn: () => approveAllGroupApplications(Number(groupId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupApplications', groupId] });
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>신청 목록을 불러오지 못했습니다.</div>;

  return (
    <Wrapper>
      {applications?.length ? (
        applications.map((app: any) => (
          <React.Fragment key={app.userId}>
            <ApplicationItem
              key={app.userId}
              data={app}
              onAccept={(id) => approveMutation.mutate(id)}
              onReject={(id) => rejectMutation.mutate(id)}
            />
            <PrimaryButton
              text={approveAllMutation.isPending ? '처리 중...' : '모두 수락하기'}
              onClick={() => approveAllMutation.mutate()}
            />
          </React.Fragment>
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
