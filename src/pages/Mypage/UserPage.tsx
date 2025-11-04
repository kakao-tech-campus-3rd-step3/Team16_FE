import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import UserProfileSection from './components/ProfileSection/UserProfileSection';
import UserRecordSection from './components/RecordSection/UserRecordSection';
import UserReviewSection from './components/ReviewSection/UserReviewSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense, useEffect } from 'react';
import { useHeader } from '@/hooks/useHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

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
