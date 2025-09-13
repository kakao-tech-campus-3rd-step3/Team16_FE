import styled from '@emotion/styled';
import PrimaryButton from '@/components/common/PrimaryButton';
import { spacing } from '@/styles/spacing';
import InfoSection from './components/InfoSection';
import { useHeader } from '@/hooks/useHeader';
import MapSection from './components/MapSection';
import AttendeeSection from './components/AttendeeSection';

const AttendPage = () => {
  useHeader({ center: '출석' });
  return (
    <Wrapper>
      <InfoSection />
      <MapSection />
      <AttendeeSection />
      <PrimaryButton text="출석하기" />
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
