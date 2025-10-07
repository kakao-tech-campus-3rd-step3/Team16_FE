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

const GroupHome = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingGroupHome } = useGroupHome(Number(groupId));
  const { data: reviews, isLoading: isLoadingReviews } = useGroupReviews(Number(groupId));

  const userIsMember = isUserMember(Number(groupId));

  if (isLoadingGroupHome || isLoadingReviews) return <div>로딩중...</div>;
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
        <ReviewHeader>이 모임이 받은 리뷰</ReviewHeader>
        {reviews.map((review: any, idx: any) => (
          <ReviewItem key={idx}> {review.contents} </ReviewItem>
        ))}
      </BodyWrapper>
      {!userIsMember && (
        <PrimaryButton
          text={'가입신청'}
          onClick={() => {
            navigate(`/apply-to-join-group/${groupId}`);
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

export default GroupHome;
