import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useGroupDashboardData } from '@/hooks/useGroupDashboardData';
import { useParams, useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/useHeader';
import { IoIosArrowForward } from 'react-icons/io';

// 날짜 비교 함수
const isPast = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  return date < now;
};

const PastSchedulePage = () => {
  const { groupId } = useParams();
  useHeader({ centerContent: '지난 일정' });
  const navigate = useNavigate();
  const { groupSchedule, isDashBoardLoading } = useGroupDashboardData(String(groupId));

  if (isDashBoardLoading) return <div>로딩중...</div>;

  const pastSchedules = Array.isArray(groupSchedule)
    ? groupSchedule.filter((sch: any) => isPast(sch.startTime)).reverse()
    : [];

  return (
    <Wrapper>
      {pastSchedules.length === 0 ? (
        <EmptyText>지난 일정이 없습니다.</EmptyText>
      ) : (
        pastSchedules.map((sch: any, idx: number) => (
          <ScheduleItem key={idx} onClick={() => navigate(`/group/${groupId}/attend/${sch.id}`)}>
            <Header>
              {sch.startTime.split('T')[0]}
              <IoIosArrowForward />
            </Header>
            <InfoText> {sch.title}</InfoText>
          </ScheduleItem>
        ))
      )}
    </Wrapper>
  );
};

export default PastSchedulePage;

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
