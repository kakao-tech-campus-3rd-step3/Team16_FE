import styled from '@emotion/styled';
import PrimaryButton from '@/components/common/PrimaryButton';
import { spacing } from '@/styles/spacing';
import InfoSection from './components/InfoSection';
import { useHeader } from '@/hooks/useHeader';
import MapSection from './components/MapSection';
import AttendeeSection from './components/AttendeeSection';
import { useState } from 'react';

const AttendPage = () => {
  useHeader({ centerContent: '출석' });
  const [isAttendanceValid, setIsAttendanceValid] = useState<boolean>(false);

  return (
    <Wrapper>
      <InfoSection />
      <MapSection
        isAttendanceValid={isAttendanceValid}
        setIsAttendanceValid={setIsAttendanceValid}
      />
      <AttendeeSection />
      <PrimaryButton
        text={isAttendanceValid ? '출석하기' : '출석 인정 범위 밖입니다'}
        disabled={!isAttendanceValid}
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
