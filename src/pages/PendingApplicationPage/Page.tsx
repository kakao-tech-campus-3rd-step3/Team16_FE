import ApplicationItem from './components/ApplicationItem';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useHeader } from '@/hooks/useHeader';

const PendingApplicationPage = () => {
  useHeader({ center: '참가신청 대기' });
  return (
    <Wrapper>
      <ApplicationItem />
      <PrimaryButton text={'모두 수락하기'} />
    </Wrapper>
  );
};

export default PendingApplicationPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  height: '100vh',
});
