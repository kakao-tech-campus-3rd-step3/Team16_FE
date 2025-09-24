import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { colors } from '@/styles/colors';
import DatePicker from './components/DatePicker';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useHeader } from '@/hooks/useHeader';
import { typography } from '@/styles/typography';
import { useNavigate, useParams } from 'react-router-dom';
import MemberCountEditor from './components/MemberCountEditor';
import TimePicker from './components/TimePicker';
import { useGroupPlan } from '@/hooks/useGroupPlan';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { groupId, planId } = useParams(); // planId가 있으면 수정, 없으면 생성
  const isEdit = !!planId;
  const pagePurpose = isEdit ? '일정 수정' : '일정 생성';
  useHeader({ centerContent: pagePurpose });

  const groupPlanQuery = isEdit
    ? useGroupPlan(Number(groupId), Number(planId))
    : { data: null, isLoading: false };

  const { data: scheduleData, isLoading } = groupPlanQuery;
  const { control, handleSubmit, watch, reset } = useFormContext();
  const [activeEditor, setActiveEditor] = useState(null);
  const formValues = watch();
  const { formState } = useFormContext();

  useEffect(() => {
    if (!formState.isDirty && scheduleData) {
      reset(toFormDefaultValues(scheduleData));
    }
  }, [scheduleData]);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
  };

  const openEditor = (editorName: any) => {
    setActiveEditor((prev) => (prev === editorName ? null : editorName));
  };

  const isFormValid = !!formValues.title;

  if (isEdit && isLoading) return <div>로딩중...</div>;

  const address = planId ? `/location-input/${groupId}/${planId}` : `/location-input/${groupId}`;

  return (
    <PageContainer>
      <Controller
        name="title"
        control={control}
        render={({ field }) => <Title {...field} placeholder="일정명을 입력해주세요" />}
      />

      <SummaryList>
        {/* 날짜 및 시간 */}
        <SummaryItem onClick={() => openEditor('dateTime')}>
          <Label>날짜 및 시간</Label>
          <Value>{`${format(formValues.startTime, 'MM월 dd일')} ${format(formValues.startTime, 'HH:mm')}`}</Value>
        </SummaryItem>
        {activeEditor === 'dateTime' && (
          <>
            <DatePicker control={control} startTime={formValues.startTime} />
            <TimePicker control={control} />
          </>
        )}

        {/* 장소 */}
        <SummaryItem onClick={() => navigate(address)}>
          <Label>장소</Label>
          <Value>{formValues.location.name}</Value>
        </SummaryItem>

        {/* 인원 */}
        <SummaryItem onClick={() => openEditor('memberCount')}>
          <Label>인원</Label>
          <Value>{formValues.capacity}명</Value>
        </SummaryItem>
        {activeEditor === 'memberCount' && <MemberCountEditor control={control} />}
      </SummaryList>

      <PrimaryButton text={pagePurpose} onClick={handleSubmit(onSubmit)} disabled={!isFormValid} />
    </PageContainer>
  );
};

export function toFormDefaultValues(scheduleData: any) {
  return {
    date: new Date(scheduleData.startTime),
    title: scheduleData.title,
    time: scheduleData.startTime.slice(11, 16), // 'HH:MM'
    location: {
      name: scheduleData.location.name,
      latitude: scheduleData.location.latitude,
      longitude: scheduleData.location.longitude,
    },
    capacity: scheduleData.capacity,
  };
}

const PageContainer = styled.div({
  padding: 24,
});

const Title = styled.input({
  ...typography.h1,
  marginBottom: 32,
  border: 'none',
  outline: 'none',
});

const SummaryList = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const SummaryItem = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  borderBottom: `1px solid ${colors.gray200}`,
  marginBottom: 8,
});

const Label = styled.span({
  ...typography.h2,
  color: colors.gray600,
});

const Value = styled.span({
  ...typography.h2,
  color: colors.gray600,
});

export default CreateEventPage;
