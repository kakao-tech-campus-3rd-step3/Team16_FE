import BottomNavigation from '@/components/common/BottomNavigation';
import ProfileSection from './components/ProfileSection';
import RecordSection from './components/RecordSection';
import ReviewSection from './components/ReviewSection';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Mypage = () => {
  const { userId: paramId } = useParams<{ userId: string }>();

  const isMyPage = !paramId;
  const targetId = paramId ? Number(paramId) : undefined;

  return (
    <Wrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileSection userId={targetId} isMyPage={isMyPage} />
        <RecordSection userId={targetId} />
        <ReviewSection userId={targetId} />
        {isMyPage && <BottomNavigation />}
      </Suspense>
    </Wrapper>
  );
};

export default Mypage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  height: '100vh',
});
