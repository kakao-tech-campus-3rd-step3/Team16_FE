import styled from '@emotion/styled';
import TagBadge from '@/components/common/TagBadge';
import { CiCalendarDate } from 'react-icons/ci';
import { IoPeopleOutline } from 'react-icons/io5';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupHome } from '@/api/groupApi';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { groupId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['groupHome'],
    queryFn: () => fetchGroupHome(Number(groupId)),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={data.groupImg} />
      </ImgWrapper>
      <BodyWrapper>
        <GroupInfo>
          <GroupHeader>
            <GroupName>{data.name}</GroupName>
            <TagBadge tag={data.safetyTag} />
          </GroupHeader>
          <Desc>
            <CiCalendarDate />
            <GroupCreatedDay>{data.createdAt} 개설됨</GroupCreatedDay>
          </Desc>
          <Desc>
            <IoPeopleOutline />
            <MemberCount>{data.capacity}</MemberCount>
          </Desc>
        </GroupInfo>
        <GroupDesc>{data.intro}</GroupDesc>
        <ReviewHeader>이 모임이 받은 리뷰</ReviewHeader>
        {data.reviews.map((review, idx) => (
          <ReviewItem key={idx}> {review.content} </ReviewItem>
        ))}
      </BodyWrapper>
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
  fontSize: '20px',
  fontWeight: 'bold',
});

const Desc = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const GroupCreatedDay = styled.div({
  ...typography.small,
  color: colors.gray700,
});

const MemberCount = GroupCreatedDay;

const GroupDesc = styled.div({
  ...typography.body,
  background: colors.gray100,
  borderRadius: '8px',
  padding: '10px',
});

const ReviewHeader = styled.h1({
  ...typography.h1,
  marginTop: '20px',
  marginBottom: '5px',
});

const ReviewItem = styled.div({
  ...typography.body,
  borderRadius: '8px',
  padding: '15px',
  background: colors.gray100,
});

export default Home;
