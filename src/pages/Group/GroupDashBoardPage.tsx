import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { LuCalendarCheck } from 'react-icons/lu';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { CiShare2 } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { useGroupDashboardData } from '@/hooks/useGroupDashboardData';

export const DashBoard = () => {
  const { groundRules, groupSchedule, isDashBoardLoading } = useGroupDashboardData('1');

  if (isDashBoardLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Wrapper>
      <GroupPromotion>
        <PromotionHeader>우리 모임의 홍보글 보기</PromotionHeader>
        <IoIosArrowForward size={20} />
      </GroupPromotion>
      <Schedule>
        <Header>
          <LuCalendarCheck size={24} strokeWidth={1.5} />
          <Title>다가오는 우리 모임의 일정</Title>
        </Header>
        <Body>
          <Text>{groupSchedule.date}</Text>
          <Text>
            시간: {groupSchedule.startTime} ~ {groupSchedule.endTime}
          </Text>
          <Text>참여인원: {groupSchedule.participants}명</Text>
        </Body>
      </Schedule>
      <GroundRule>
        <Header>
          <IoDocumentTextOutline size={24} />
          <Title>모임 규칙</Title>
        </Header>
        <Body>
          <Text>{groundRules.content}</Text>
        </Body>
      </GroundRule>
      <CardSection>
        <Card>
          <IoCheckmarkDoneSharp size={24} color={colors.primary} />
          <Attend>출석관리</Attend>
        </Card>
        <Card>
          <CiShare2 size={24} color={colors.primary} strokeWidth={1} />
          <TimePicker>공유 시간 플래너</TimePicker>
        </Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
        <Card>우리 모임의 카드</Card>
      </CardSection>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px',
  gap: '30px',
});

const GroupPromotion = styled.div({
  ...typography.h2,
  padding: '15px',
  background: colors.primary,
  borderRadius: '12px',
  color: 'white',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const Section = styled.div({
  background: colors.gray100,
  borderRadius: '12px',
  padding: '15px',
});

const Schedule = Section;

const GroundRule = Section;

const Header = styled.div({
  height: '40px',
  display: 'flex',
  borderBottom: `1px solid ${colors.gray300}`,
  gap: '10px',
  alignItems: 'center',
});

const Body = styled.div({
  marginTop: '15px',
});

const Title = styled.h2({
  ...typography.h2,
});

const Text = styled.p({
  ...typography.body,
});

const CardSection = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
});

const Card = styled.div({
  height: '80px',
  borderRadius: '12px',
  background: colors.white,
  border: `1px solid ${colors.gray300}`,
  boxShadow: '0px 1px 2px 0px lightgray',
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
});

const Attend = styled.div({
  ...typography.h3,
});

const TimePicker = styled.div({
  ...typography.h3,
});

const PromotionHeader = styled.div({
  ...typography.h2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});

export default DashBoard;
