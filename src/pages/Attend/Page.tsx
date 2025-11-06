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

const AttendPage = () => {
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
      alert('일정 참여가 완료되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '일정 참여에 실패했습니다.';
      if (errorMessage.includes('정원이 초과')) {
        alert('해당 일정의 정원이 초과되어 참여할 수 없습니다.');
      } else {
        alert(errorMessage);
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

  // 현재 사용자가 참여자 목록에 있는지 확인
  const isUserParticipant = participants.some((participant) => participant.user.id == userInfo?.id);

  const handleJoinPlan = () => {
    joinPlanMutation.mutate();
  };

  const handleAttend = () => {
    attendMutation.mutate();
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
      <PrimaryButton
        text={
          !isUserParticipant
            ? '일정 참여'
            : isPastMeeting
              ? '지난 모임입니다'
              : isUserAttended
                ? '출석완료'
                : isAttendanceValid
                  ? '출석하기'
                  : '출석 인정 범위 밖입니다'
        }
        disabled={
          !isUserParticipant ? false : isPastMeeting || !isAttendanceValid || isUserAttended
        }
        onClick={
          !isUserParticipant
            ? handleJoinPlan
            : isAttendanceValid && !isUserAttended && !isPastMeeting
              ? handleAttend
              : undefined
        }
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
