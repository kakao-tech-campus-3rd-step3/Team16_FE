import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { FaCalendarAlt, FaUserMinus, FaBell } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getMockAlarms, type Alarm } from '@/api/alarmApi';

const AlarmList = () => {
  const {
    data: alarms,
    isLoading,
    isError,
  } = useQuery<Alarm[]>({
    queryKey: ['alarms'],
    queryFn: getMockAlarms, // 나중에 getAlarms로 교체
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>알림을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <>
      {alarms?.map((alarm) => (
        <ItemWrapper key={alarm.id}>
          <AlarmIcon>{getIcon(alarm.type)}</AlarmIcon>
          <AlarmInfo>
            <AlarmContent>{alarm.message}</AlarmContent>
            <AlarmDate>{formatDate(alarm.createdAt)}</AlarmDate>
            {alarm.action && alarm.action.label === '모임원 리뷰하기' && (
              <ActionButton onClick={() => (window.location.href = alarm.action!.url)}>
                {alarm.action.label}
              </ActionButton>
            )}
          </AlarmInfo>
        </ItemWrapper>
      ))}
    </>
  );
};

export default AlarmList;

function getIcon(type: string) {
  switch (type) {
    case 'schedule_created':
      return <FaCalendarAlt size={24} />;
    case 'member_left':
      return <FaUserMinus size={24} />;
    default:
      return <FaBell size={24} />;
  }
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const ItemWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.spacing3,
  padding: spacing.spacing4,
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.gray300}`,
});

const AlarmIcon = styled.div({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: colors.infoLight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: colors.info,
});

const AlarmInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const AlarmContent = styled.div({
  ...typography.body,
  color: colors.black,
  marginBottom: spacing.spacing1,
});

const AlarmDate = styled.div({
  ...typography.small,
  color: colors.gray600,
});

const ActionButton = styled.button({
  marginTop: spacing.spacing2,
  padding: `${spacing.spacing2}px ${spacing.spacing3}px`,
  borderRadius: '8px',
  border: 'none',
  backgroundColor: colors.primary,
  color: colors.white,
  cursor: 'pointer',
});
