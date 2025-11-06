import { MemberItem } from './components/MemberItem';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { useHeader } from '@/hooks/useHeader';
import { useParams } from 'react-router-dom';
import { getMemberListApi } from './api/getMemeberListApi';
import { useBanMember } from './hooks/useBanMember';
import { isUserLeader } from '@/utils/groupMemberShip';
import type { Member } from './types';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const PendingApplicationPage = () => {
  useHeader({ centerContent: '멤버' });
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const numericGroupId = Number(groupId);

  const { data: members, isLoading } = useQuery({
    queryKey: ['members', groupId],
    queryFn: () => getMemberListApi(numericGroupId),
  });

  const { mutate: banMember } = useBanMember(numericGroupId);
  const isLeader = isUserLeader(numericGroupId);

  const handleBan = (userId: number) => {
    banMember({
      groupId: numericGroupId,
      userId,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(members);

  return (
    <Wrapper>
      {members?.map((member: Member) => (
        <MemberItem
          key={member.id}
          member={member}
          onClick={() => {
            navigate(`/mypage/${member.userId}`);
          }}
          onBan={handleBan}
          showBanButton={isLeader}
        />
      ))}
    </Wrapper>
  );
};

export default PendingApplicationPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
  padding: '16px',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
});
