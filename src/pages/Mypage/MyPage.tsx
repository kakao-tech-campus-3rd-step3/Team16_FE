import BottomNavigation from '@/components/common/BottomNavigation';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import MyProfileSection from './components/ProfileSection/MyProfileSection';
import MyReviewSection from './components/ReviewSection/MyReviewSection';
import MyRecordSection from './components/RecordSection/MyRecordSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';

const MyPage = () => {
  return (
    <Wrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <MyProfileSection />
        <MyRecordSection />
        <MyReviewSection />
      </Suspense>
      <BottomNavigation />
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
  marginBottom: '80px',
});
