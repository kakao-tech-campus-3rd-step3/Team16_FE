import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useGroupSchedule } from '@/hooks/useGroupSchedule';
import { useParams, useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/useHeader';
import { IoIosArrowForward } from 'react-icons/io';
import PrimaryButton from '@/components/common/PrimaryButton';

// 날짜 비교 함수
const isPast = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  return date < now;
};

const AllSchedulePage = () => {
  const { groupId } = useParams();
  useHeader({ centerContent: '모든 일정' });
  const navigate = useNavigate();
  const { data: groupSchedules, isLoading: isGroupScheduleLoading } = useGroupSchedule(
    Number(groupId)
  );

  if (isGroupScheduleLoading) return <div>로딩중...</div>;

  const pastSchedules = Array.isArray(groupSchedules)
    ? groupSchedules.filter((sch: any) => isPast(sch.startTime)).reverse()
    : [];

  const upcomingSchedules = Array.isArray(groupSchedules)
    ? groupSchedules.filter((sch: any) => !isPast(sch.startTime)).reverse()
    : [];

  if (groupSchedules.length === 0) {
    return (
      <Wrapper>
        <EmptyText>일정이 없습니다.</EmptyText>
        <PrimaryButton text={'일정 추가'} onClick={() => navigate(`/create-schedule/${groupId}`)} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>다가오는 일정</Title>
      {upcomingSchedules.map((sch: any) => (
        //편집 페이지로 이동
        <ScheduleItem
          key={sch.id}
          onClick={() => navigate(`/create-schedule/${groupId}/${sch.id}`)}
        >
          <Header>
            {sch.startTime.split('T')[0]}
            <IoIosArrowForward />
          </Header>
          <InfoText> {sch.title}</InfoText>
        </ScheduleItem>
      ))}
      <Title>지난 일정</Title>
      {pastSchedules.map((sch: any) => (
        //출석관리 페이지로 이동
        <ScheduleItem key={sch.id} onClick={() => navigate(`/group/${groupId}/attend/${sch.id}`)}>
          <Header>
            {sch.startTime.split('T')[0]}
            <IoIosArrowForward />
          </Header>
          <InfoText> {sch.title}</InfoText>
        </ScheduleItem>
      ))}
      <PrimaryButton text={'일정 추가'} onClick={() => navigate(`/create-schedule/${groupId}`)} />
    </Wrapper>
  );
};

export default AllSchedulePage;

const Wrapper = styled.div({
  margin: '0 auto',
  padding: '32px 16px',
});

const EmptyText = styled.div({
  color: colors.gray400,
  textAlign: 'center',
  marginTop: 40,
});

const ScheduleItem = styled.div({
  background: colors.gray100,
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
});

const Header = styled.div({
  ...typography.h3,
  marginBottom: 8,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const InfoText = styled.div({
  ...typography.body,
  marginBottom: 4,
});

const Title = styled.div({
  ...typography.h2,
  margin: '24px 0 16px 0',
});
