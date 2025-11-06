import BottomNavigation from '@/components/common/BottomNavigation';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import MyProfileSection from './components/ProfileSection/MyProfileSection';
import MyReviewSection from './components/ReviewSection/MyReviewSection';
import MyRecordSection from './components/RecordSection/MyRecordSection';
import ScoreSection from './components/ScoreSection/ScoreSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/userApi';

const MyPage = () => {
  const { data: profile } = useSuspenseQuery({
    queryKey: ['userProfile', 'me'],
    queryFn: getUserInfo,
  });

  return (
    <Wrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <MyProfileSection />
        <ScoreWrapper>
          <ScoreSection userScore={profile.userScore ?? 0} />
        </ScoreWrapper>
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

const ScoreWrapper = styled.div({
  padding: `20px`,
});
