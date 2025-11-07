import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import UserProfileSection from './components/ProfileSection/UserProfileSection';
import UserRecordSection from './components/RecordSection/UserRecordSection';
import UserReviewSection from './components/ReviewSection/UserReviewSection';
import ScoreSection from './components/ScoreSection/ScoreSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense, useEffect } from 'react';
import { useHeader } from '@/hooks/useHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfoById } from '@/api/userApi';

interface UserPageProps {
  userId: number;
}

const UserPage = ({ userId }: UserPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | {
        from?: string;
        activeTab?: string;
        scrollPosition?: number;
        commentPostId?: number;
      }
    | undefined;

  const { data: profile } = useSuspenseQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserInfoById(userId),
  });

  // UserPage 마운트 시 스크롤을 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (state?.from) {
      navigate(state.from, {
        state: {
          activeTab: state.activeTab,
          scrollPosition: state.scrollPosition,
          commentPostId: state.commentPostId,
        },
      });
    } else {
      navigate(-1);
    }
  };

  useHeader({
    centerContent: '유저 정보',
    leftContent: <HiOutlineChevronLeft size={20} onClick={handleBack} />,
  });

  return (
    <Wrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <UserProfileSection userId={userId} />
        <ScoreWrapper>
          <ScoreSection userScore={profile.userScore ?? 0} />
        </ScoreWrapper>
        <UserRecordSection userId={userId} />
        <UserReviewSection userId={userId} />
      </Suspense>
    </Wrapper>
  );
};

export default UserPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
});

const ScoreWrapper = styled.div({
  padding: `16px`,
});
