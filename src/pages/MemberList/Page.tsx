import { MemberItem } from './components/MemberItem';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { useHeader } from '@/hooks/useHeader';
import { useParams } from 'react-router-dom';
import { getMemberListApi } from './api/getMemeberListApi';
import type { Member } from './types';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const PendingApplicationPage = () => {
  useHeader({ centerContent: '멤버' });
  const { groupId } = useParams<{ groupId: string }>();

  const { data: members, isLoading } = useQuery({
    queryKey: ['members', groupId],
    queryFn: () => getMemberListApi(Number(groupId)),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Wrapper>
      {members?.map((member: Member) => (
        <MemberItem key={member.id} member={member} />
      ))}
    </Wrapper>
  );
};

export default PendingApplicationPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
  padding: '16px',
});
