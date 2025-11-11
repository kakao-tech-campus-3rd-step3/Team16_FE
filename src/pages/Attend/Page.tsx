import styled from '@emotion/styled';
import PrimaryButton from '@/components/common/PrimaryButton';
import { spacing } from '@/styles/spacing';
import InfoSection from './components/InfoSection';
import { useHeader } from '@/hooks/useHeader';
import MapSection from './components/MapSection';
import AttendeeSection from './components/AttendeeSection';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserAttendanceStatus, submitAttendance } from './api/attendApi';
import type { AttendanceResponse } from './type';
import { getGroupPlan, getPlanParticipants, joinPlan } from '@/api/groupScheduleApi';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useUserInfo from '@/hooks/useUserInfo';
import CustomAlert from '@/components/common/CustomAlert';
import { useAlert } from '@/hooks/useAlert';

const AttendPage = () => {
  const { isOpen: isAlertOpen, alertOptions, showAlert, closeAlert } = useAlert();
  useHeader({ centerContent: '출석' });
  const { groupId, planId } = useParams();
  const queryClient = useQueryClient();
  const { data: userInfo } = useUserInfo();

  const { data: planData, isLoading } = useQuery({
    queryKey: ['groupPlan', groupId, planId],
    queryFn: () => getGroupPlan(Number(groupId), Number(planId)),
    enabled: !!groupId && !!planId,
  });

  const { data: participants = [] } = useQuery({
    queryKey: ['planParticipants', planId],
    queryFn: () => getPlanParticipants(Number(planId)),
    enabled: !!planId,
  });

  const joinPlanMutation = useMutation({
    mutationFn: () => joinPlan(Number(planId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planParticipants', planId] });
      queryClient.invalidateQueries({ queryKey: ['attendees', planId] });
      queryClient.invalidateQueries({ queryKey: ['groupPlan', groupId, planId] });
      showAlert({ message: '일정 참여가 완료되었습니다.', type: 'success' });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '일정 참여에 실패했습니다.';
      if (errorMessage.includes('정원이 초과')) {
        showAlert({ message: '해당 일정의 정원이 초과되어 참여할 수 없습니다.', type: 'error' });
      } else {
        showAlert({ message: errorMessage, type: 'error' });
      }
    },
  });

  const attendMutation = useMutation({
    mutationFn: () => submitAttendance(Number(groupId), Number(planId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendees', planId] });
    },
  });

  const { data } = useQuery<AttendanceResponse>({
    queryKey: ['attendees', planId],
    queryFn: () => getUserAttendanceStatus(Number(groupId), Number(planId)),
    enabled: !!groupId && !!planId,
  });
  const attendees = data?.attendees || [];
  const isUserAttended = data?.isUserAttended || false; //유저가 출석했는지 여부

  const [isAttendanceValid, setIsAttendanceValid] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!planData) {
    return <div>일정 정보를 불러올 수 없습니다.</div>;
  }

  const planTitle = planData?.title;
  const location = planData?.location.name;
  const startTime = format(planData.startTime, 'yyyy년 MM월 dd일 HH:mm');
  const description = planData?.description;
  const latitude = planData.location.latitude;
  const longitude = planData.location.longitude;

  const isPastMeeting = new Date() > new Date(planData.endTime);

  // 출석 가능 시간 체크 (endTime 이후인지 확인)
  const isAfterEndTime = new Date() > new Date(planData.endTime);

  // 일정 시작 1시간 전 시간 계산
  const oneHourBeforeStart = new Date(new Date(planData.startTime).getTime() - 60 * 60 * 1000);
  const now = new Date();
  const isBeforeAttendanceTime = now < oneHourBeforeStart;

  // 출석 가능 시간까지 남은 시간 계산
  const timeUntilAttendance = oneHourBeforeStart.getTime() - now.getTime();
  const hoursUntil = Math.floor(timeUntilAttendance / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeUntilAttendance % (1000 * 60 * 60)) / (1000 * 60));

  // 현재 사용자가 참여자 목록에 있는지 확인
  const isUserParticipant = participants.some((participant) => participant.user.id == userInfo?.id);

  const handleJoinPlan = () => {
    joinPlanMutation.mutate();
  };

  const handleAttend = () => {
    attendMutation.mutate();
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (!isUserParticipant) {
      return '일정 참여';
    }
    if (isPastMeeting) {
      return '지난 모임입니다';
    }
    if (isUserAttended) {
      return '출석완료';
    }
    if (isAfterEndTime) {
      return '출석 가능 시간이 지났습니다';
    }
    if (isBeforeAttendanceTime) {
      // 1시간 전보다 일찍인 경우
      if (hoursUntil > 0) {
        return `${hoursUntil}시간 ${minutesUntil}분 후 출석 가능`;
      } else {
        return `${minutesUntil}분 후 출석 가능`;
      }
    }
    if (isAttendanceValid) {
      return '출석하기';
    }
    return '출석 인정 범위 밖입니다';
  };

  return (
    <Wrapper>
      <InfoSection
        planTitle={planTitle}
        location={location}
        startTime={startTime}
        description={description}
      />
      <MapSection
        isAttendanceValid={isAttendanceValid}
        setIsAttendanceValid={setIsAttendanceValid}
        latitude={latitude}
        longitude={longitude}
      />
      <AttendeeSection
        attendees={attendees}
        startTime={
          typeof planData.startTime === 'string'
            ? planData.startTime
            : planData.startTime.toISOString()
        }
      />
      <div style={{ height: '60px' }} />
      <PrimaryButton
        text={getButtonText()}
        disabled={
          !isUserParticipant
            ? false
            : isPastMeeting ||
              isAfterEndTime ||
              isBeforeAttendanceTime ||
              !isAttendanceValid ||
              isUserAttended
        }
        onClick={
          !isUserParticipant
            ? handleJoinPlan
            : isAttendanceValid &&
                !isUserAttended &&
                !isPastMeeting &&
                !isAfterEndTime &&
                !isBeforeAttendanceTime
              ? handleAttend
              : undefined
        }
      />
      <CustomAlert
        isOpen={isAlertOpen}
        onClose={closeAlert}
        message={alertOptions.message}
        type={alertOptions.type}
        confirmText={alertOptions.confirmText}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  margin: `${spacing.spacing4}px`,
  gap: `${spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'column',
});

export default AttendPage;
