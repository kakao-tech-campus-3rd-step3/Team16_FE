import styled from '@emotion/styled';
import PrimaryButton from '@/components/common/PrimaryButton';
import { spacing } from '@/styles/spacing';
import InfoSection from './components/InfoSection';
import { useHeader } from '@/hooks/useHeader';
import MapSection from './components/MapSection';
import AttendeeSection from './components/AttendeeSection';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserAttendanceStatus } from './api/attendApi';
import type { AttendanceResponse } from './type';
import { getGroupPlan } from '@/api/groupScheduleApi';
import { format } from 'date-fns';

const AttendPage = () => {
  useHeader({ centerContent: '출석' });
  const { groupId, planId } = useParams();

  const { data: planData, isLoading } = useQuery({
    queryKey: ['groupPlan', groupId, planId],
    queryFn: () => getGroupPlan(Number(groupId), Number(planId)),
    enabled: !!groupId && !!planId,
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
    return <div>로딩중...</div>;
  }
  if (!planData) {
    return <div>일정 정보를 불러올 수 없습니다.</div>;
  }

  const planTitle = planData?.title;
  const location = planData?.location.name;
  const startTime = format(planData.startTime, 'yyyy년 MM월 dd일 HH:mm');
  const latitude = planData.location.latitude;
  const longitude = planData.location.longitude;
  return (
    <Wrapper>
      <InfoSection planTitle={planTitle} location={location} startTime={startTime} />
      <MapSection
        isAttendanceValid={isAttendanceValid}
        setIsAttendanceValid={setIsAttendanceValid}
        latitude={latitude}
        longitude={longitude}
      />
      <AttendeeSection attendees={attendees} />
      <PrimaryButton
        text={
          isUserAttended ? '출석완료' : isAttendanceValid ? '출석하기' : '출석 인정 범위 밖입니다'
        }
        disabled={!isAttendanceValid || isUserAttended}
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
