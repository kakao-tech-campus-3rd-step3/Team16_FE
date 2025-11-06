import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useGroupSchedule } from '@/hooks/useGroupSchedule';
import { useParams, useNavigate } from 'react-router-dom';
import { useHeader } from '@/hooks/useHeader';
import { IoIosArrowForward, IoMdPeople } from 'react-icons/io';
import { MdUpcoming, MdPlayCircle, MdHistory, MdEdit } from 'react-icons/md';
import PrimaryButton from '@/components/common/PrimaryButton';
import { isUserLeader } from '@/utils/groupMemberShip';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// 날짜 비교 함수
const isPast = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);
  return date < now;
};

const isOngoing = (startTime: string, endTime: string) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return start <= now && now <= end;
};

const AllSchedulePage = () => {
  const { groupId } = useParams();
  useHeader({ centerContent: '모든 일정' });
  const navigate = useNavigate();
  const { data: groupSchedules, isLoading: isGroupScheduleLoading } = useGroupSchedule(
    Number(groupId)
  );
  const userIsLeader = isUserLeader(Number(groupId));

  if (isGroupScheduleLoading) return <LoadingSpinner />;

  const ongoingSchedules = Array.isArray(groupSchedules)
    ? groupSchedules.filter((sch: any) => isOngoing(sch.startTime, sch.endTime))
    : [];

  const pastSchedules = Array.isArray(groupSchedules)
    ? groupSchedules
        .filter((sch: any) => isPast(sch.endTime) && !isOngoing(sch.startTime, sch.endTime))
        .reverse()
    : [];

  const upcomingSchedules = Array.isArray(groupSchedules)
    ? groupSchedules
        .filter((sch: any) => !isPast(sch.startTime) && !isOngoing(sch.startTime, sch.endTime))
        .reverse()
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
      <TitleWithIcon>
        <MdUpcoming size={24} color={colors.primaryMidLight} />
        <Title>다가오는 일정</Title>
      </TitleWithIcon>
      {upcomingSchedules.map((sch: any) => (
        <ScheduleItem key={sch.id} onClick={() => navigate(`/group/${groupId}/attend/${sch.id}`)}>
          <Header>
            <DateText>{sch.startTime.split('T')[0]}</DateText>
            <IoIosArrowForward />
          </Header>
          {userIsLeader && (
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/create-schedule/${groupId}/${sch.id}`);
              }}
            >
              <MdEdit size={24} />
            </EditIcon>
          )}
          <InfoText> {sch.title}</InfoText>
          <ParticipantText>
            <IoMdPeople size={16} />
            {sch.headCount} / {sch.capacity}
          </ParticipantText>
        </ScheduleItem>
      ))}
      <TitleWithIcon>
        <MdPlayCircle size={24} color={colors.primary} />
        <Title>진행중인 일정</Title>
      </TitleWithIcon>
      {ongoingSchedules.map((sch: any) => (
        <ScheduleItem key={sch.id} onClick={() => navigate(`/group/${groupId}/attend/${sch.id}`)}>
          <Header>
            <DateText>{sch.startTime.split('T')[0]}</DateText>
            <IoIosArrowForward />
          </Header>
          <InfoText> {sch.title}</InfoText>
          <ParticipantText>
            <IoMdPeople size={16} />
            {sch.headCount} / {sch.capacity}
          </ParticipantText>
        </ScheduleItem>
      ))}
      <TitleWithIcon>
        <MdHistory size={24} color={colors.primaryMidLight} />
        <Title>지난 일정</Title>
      </TitleWithIcon>
      {pastSchedules.map((sch: any) => (
        <ScheduleItem key={sch.id} onClick={() => navigate(`/group/${groupId}/attend/${sch.id}`)}>
          <Header>
            <DateText>{sch.startTime.split('T')[0]}</DateText>
            <IoIosArrowForward />
          </Header>
          <InfoText> {sch.title}</InfoText>
          <ParticipantText>
            <IoMdPeople size={16} />
            {sch.headCount} / {sch.capacity}
          </ParticipantText>
        </ScheduleItem>
      ))}
      {userIsLeader && (
        <PrimaryButton text={'일정 추가'} onClick={() => navigate(`/create-schedule/${groupId}`)} />
      )}
    </Wrapper>
  );
};

export default AllSchedulePage;

const Wrapper = styled.div({
  marginBottom: 80,
  padding: '16px',
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
  position: 'relative',
});

const Header = styled.div({
  ...typography.h3,
  marginBottom: 8,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const DateText = styled.span({
  flex: 1,
});

const EditIcon = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: colors.primary,
  padding: '4px',
  transition: 'all 0.2s',
  position: 'absolute',
  top: '45px',
  right: '20px',
  '&:hover': {
    transform: 'scale(1.1)',
    color: colors.primaryDark,
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  marginTop: '12px',
});

const InfoText = styled.div({
  ...typography.body,
  marginBottom: 4,
});

const ParticipantText = styled.div({
  ...typography.caption,
  color: colors.gray600,
  marginTop: 4,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const Title = styled.div({
  ...typography.h2,
  margin: '12px 0',
});

const TitleWithIcon = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '12px 0',
});
