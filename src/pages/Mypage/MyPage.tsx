import BottomNavigation from '@/components/common/BottomNavigation';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import MyProfileSection from './components/ProfileSection/MyProfileSection';
import MyReviewSection from './components/ReviewSection/MyReviewSection';
import MyRecordSection from './components/RecordSection/MyRecordSection';

const MyPage = () => {
  return (
    <Wrapper>
      <MyProfileSection />
      <MyRecordSection />
      <MyReviewSection />
      <BottomNavigation />
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
});
