import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { FaCalendarAlt, FaUserMinus, FaBell, FaUserPlus } from 'react-icons/fa';
import { useAlarms } from '@/hooks/useAlarms';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { Alarm } from '@/api/alarmApi';

const AlarmList = () => {
  const { data: alarms, isLoading, error } = useAlarms();
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>알림을 불러오는 중 오류가 발생했습니다.</div>;

  const handleAlarmClick = (alarm: Alarm) => {
    if (alarm.notificationType === 'GROUP_JOIN_LEFT') {
      return;
    }

    if (alarm.relatedGroupId) {
      if (alarm.message.includes('가입을 요청했습니다')) {
        navigate(`/group/${alarm.relatedGroupId}/pending-application`);
      } else {
        navigate(`/group/${alarm.relatedGroupId}`);
      }
    }
  };

  return (
    <>
      {alarms?.slice(0, 10).map((alarm: Alarm) => (
        <ItemWrapper
          key={alarm.alarmId}
          isRead={alarm.isRead}
          onClick={() => handleAlarmClick(alarm)}
        >
          <AlarmIcon>{getIcon(alarm.notificationType)}</AlarmIcon>
          <AlarmInfo>
            <AlarmContent>{alarm.message}</AlarmContent>
            <AlarmMeta>
              <AlarmType>{convertTypeLabel(alarm.notificationType)}</AlarmType>
            </AlarmMeta>
            {alarm.isReviewed === false && alarm.notificationType === 'GROUP_JOIN_LEFT' && (
              <ActionButton
                onClick={() =>
                  navigate('/member-review', {
                    state: {
                      groupId: alarm.relatedGroupId,
                      targetUserId: alarm.relatedUserId,
                      targetNickname: alarm.nickname,
                    },
                  })
                }
              >
                모임원 리뷰하기
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
    case 'GROUP_JOIN_LEFT':
      return <FaUserMinus size={22} />;
    case 'GROUP_JOIN_REQUEST':
      return <FaUserPlus size={22} />;
    case 'CHANGE_GROUP_PLAN':
      return <FaCalendarAlt size={22} />;
    default:
      return <FaBell size={22} />;
  }
}

function convertTypeLabel(type: string) {
  switch (type) {
    case 'GROUP_JOIN_LEFT':
      return '모임 탈퇴 알림';
    case 'GROUP_JOIN_REQUEST':
      return '모임 가입 알림';
    case 'CHANGE_GROUP_PLAN':
      return '일정 변경 알림';
    default:
      return '일반 알림';
  }
}

const ItemWrapper = styled.div<{ isRead: boolean }>(({ isRead }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.spacing3,
  padding: spacing.spacing4,
  backgroundColor: isRead ? colors.gray100 : colors.white,
  borderBottom: `1px solid ${colors.gray300}`,
}));

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

const AlarmMeta = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const AlarmType = styled.div({
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
