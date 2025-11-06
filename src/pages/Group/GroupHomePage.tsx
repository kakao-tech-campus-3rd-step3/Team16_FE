import styled from '@emotion/styled';
import TagBadge from '@/components/common/TagBadge';
import { CiCalendarDate } from 'react-icons/ci';
import { IoPeopleOutline } from 'react-icons/io5';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import useGroupHome from '@/hooks/useGroupHome';
import { useParams, useNavigate } from 'react-router-dom';
import { useGroupReviews } from '@/hooks/useGroupReviews';
import { format } from 'date-fns';
import PrimaryButton from '@/components/common/PrimaryButton';
import { isUserMember } from '@/utils/groupMemberShip';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { getMemberListApi } from '@/pages/MemberList/api/getMemeberListApi';
import { MemberItem } from '@/pages/MemberList/components/MemberItem';
import type { Member } from '@/pages/MemberList/types';
import { useState } from 'react';
import UserPageModal from '@/components/common/UserPageModal';

const GroupHome = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const { data, isLoading: isLoadingGroupHome } = useGroupHome(Number(groupId));
  const { data: reviews, isLoading: isLoadingReviews } = useGroupReviews(Number(groupId));
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['members', groupId],
    queryFn: () => getMemberListApi(Number(groupId)),
  });

  const userIsMember = isUserMember(Number(groupId));

  if (isLoadingGroupHome || isLoadingReviews || isLoadingMembers) return <LoadingSpinner />;
  if (!data) return <div>데이터가 없습니다</div>;

  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={data.coverImageUrl} />
      </ImgWrapper>
      <BodyWrapper>
        <GroupInfo>
          <GroupHeader>
            <GroupName>{data.name}</GroupName>
            <TagBadge tag={data.safetyTag} />
          </GroupHeader>
          <Desc>
            <CiCalendarDate />
            <GroupCreatedDay>
              {format(new Date(data.createdAt), 'yyyy-MM-dd')} 개설됨
            </GroupCreatedDay>
          </Desc>
          <Desc>
            <IoPeopleOutline />
            <MemberCount>{data.capacity}</MemberCount>
          </Desc>
        </GroupInfo>
        <GroupDesc>{data.intro}</GroupDesc>

        <MembersSection>
          <SectionHeader>모임원</SectionHeader>
          <MembersGrid>
            {members?.map((member: Member) => (
              <MemberItem
                key={member.id}
                member={member}
                onClick={() => {
                  setSelectedUserId(member.userId);
                  setIsUserModalOpen(true);
                }}
              />
            ))}
          </MembersGrid>
        </MembersSection>

        <ReviewHeader>이 모임이 받은 리뷰</ReviewHeader>
        {reviews.map((review: any, idx: any) => (
          <ReviewItem key={idx}> {review.contents} </ReviewItem>
        ))}
      </BodyWrapper>

      <UserPageModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        userId={selectedUserId}
      />

      {!userIsMember && (
        <PrimaryButton
          text={'가입신청'}
          onClick={() => {
            navigate(`/apply-to-join-group/${groupId}`, { replace: true });
          }}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div({});

const ImgWrapper = styled.div({
  width: '100%',
  height: '250px',
});

const Img = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const BodyWrapper = styled.div({
  margin: '15px',
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
});

const GroupHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const GroupInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const GroupName = styled.div({
  ...typography.h1,
});

const Desc = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const smallMuted = styled.div({
  ...typography.small,
  color: colors.gray700,
});

const GroupCreatedDay = smallMuted;
const MemberCount = smallMuted;

const GroupDesc = styled.div({
  ...typography.body,
  background: colors.gray100,
  borderRadius: '8px',
  padding: '10px',
});

const ReviewHeader = styled.h1({
  ...typography.h2,
  marginTop: '20px',
  marginBottom: '5px',
});

const ReviewItem = styled.div({
  ...typography.body,
  borderRadius: '8px',
  padding: '15px',
  background: colors.gray100,
});

const MembersSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '10px',
});

const SectionHeader = styled.h2({
  ...typography.h2,
  marginBottom: '5px',
});

const MembersGrid = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export default GroupHome;
