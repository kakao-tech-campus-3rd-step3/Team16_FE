import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { LuCalendarCheck } from 'react-icons/lu';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { CiShare2 } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { useGroupSchedule } from '@/hooks/useGroupSchedule';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DateDiff from './components/DateDiff';
import { FaCalendarAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getRules } from '@/api/rulesApi';
import type { Rule } from '@/api/rulesApi';
import { GoPeople } from 'react-icons/go';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export const DashBoard = () => {
  const { groupId } = useParams();
  const { data: groupSchedule, isLoading: isGroupScheduleLoading } = useGroupSchedule(
    Number(groupId)
  );

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const numericGroupId = Number(groupId);

  const { data: groundRules = [], isLoading: isGroundRulesLoading } = useQuery({
    queryKey: ['rules', numericGroupId],
    queryFn: () => getRules(numericGroupId),
    enabled: !!numericGroupId,
  });

  const isDashBoardLoading = isGroundRulesLoading || isGroupScheduleLoading;

  if (isDashBoardLoading) {
    return <LoadingSpinner />;
  }

  const upcomingSchedules = Array.isArray(groupSchedule)
    ? groupSchedule.filter((sch: ScheduleType) => isUpcoming(sch.endTime))
    : [];

  if (!open) {
    upcomingSchedules.splice(1);
  }

  return (
    <Wrapper>
      <GroupPromotion>
        <PromotionHeader>우리 모임의 홍보글 보기</PromotionHeader>
        <IoIosArrowForward size={20} />
      </GroupPromotion>
      <Schedule>
        <Header style={{ cursor: 'pointer' }} onClick={() => setOpen((prev) => !prev)}>
          <LuCalendarCheck size={24} strokeWidth={1.5} />
          <Title>우리 모임의 일정</Title>
          <AccordionArrow size={20} open={open} />
        </Header>
        <Body>
          {upcomingSchedules.map((sch: ScheduleType) => (
            <AccordionItem
              key={sch.id}
              onClick={() => navigate(`/group/${groupId}/attend/${sch.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Info>
                <Text>시작: {formatDateToKorean(sch.startTime)}</Text>
                <Text>종료: {formatDateToKorean(sch.endTime)}</Text>
                <Text>참여인원: {sch.capacity}명</Text>
              </Info>
              <DateDiff date={sch.startTime} />
            </AccordionItem>
          ))}
        </Body>
      </Schedule>
      <GroundRule>
        <Header>
          <IoDocumentTextOutline size={24} />
          <Title>모임 규칙</Title>
        </Header>
        <Body>
          {isGroundRulesLoading ? (
            <Text>불러오는 중...</Text>
          ) : groundRules.length > 0 ? (
            groundRules.map((rule: Rule) => <Text key={rule.id}>{rule.text ?? '내용 없음'}</Text>)
          ) : (
            <Text>등록된 규칙이 없습니다.</Text>
          )}
        </Body>
      </GroundRule>
      <CardSection>
        <Card onClick={() => navigate(`/group/${groupId}/schedule`)}>
          <FaCalendarAlt size={24} color={colors.primary} />
          <Attend>일정</Attend>
        </Card>
        <Card>
          <CiShare2 size={24} color={colors.primary} strokeWidth={1} />
          <TimePicker>공유 시간 플래너</TimePicker>
        </Card>
        <Card onClick={() => navigate(`/group/${groupId}/members`)}>
          <GoPeople size={24} color={colors.primary} strokeWidth={1} />
          <TimePicker>멤버</TimePicker>
        </Card>
      </CardSection>
    </Wrapper>
  );
};

//현재시간보다 종료시간이 이후면 다가오는 일정으로 구분하는함수
const isUpcoming = (endTime: string) => {
  const now = new Date();
  const scheduleTime = new Date(endTime);
  return scheduleTime > now;
};

const formatDateToKorean = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${hours}:${minutes}`;
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
  flex: 1,
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

const AccordionArrow = styled(IoIosArrowDown)<{ open: boolean }>(({ open }) => ({
  transition: 'transform 0.2s',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
}));

const AccordionItem = styled.div({
  padding: '8px 0',
  borderBottom: `1px solid ${colors.gray200}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Info = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

interface ScheduleType {
  id: number;
  title: string;
  description: string;
  capacity: number;
  startTime: string;
  endTime: string;
}

export default DashBoard;
