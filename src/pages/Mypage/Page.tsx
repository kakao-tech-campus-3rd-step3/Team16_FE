import BottomNavigation from '@/components/common/BottomNavigation';
import ProfileSection from './components/ProfileSection';
import RecordSection from './components/RecordSection';
import ReviewSection from './components/ReviewSection';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

const Mypage = () => {
  return (
    <Wrapper>
      <ProfileSection />
      <RecordSection />
      <ReviewSection />
      <BottomNavigation />
    </Wrapper>
  );
};

export default Mypage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  height: '100vh',
});
