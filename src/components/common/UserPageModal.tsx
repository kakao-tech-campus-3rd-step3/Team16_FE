import BaseModal from '@/components/common/BaseModal';
import UserProfileSection from '@/pages/Mypage/components/ProfileSection/UserProfileSection';
import UserRecordSection from '@/pages/Mypage/components/RecordSection/UserRecordSection';
import UserReviewSection from '@/pages/Mypage/components/ReviewSection/UserReviewSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { typography } from '@/styles/typography';
import ScoreSection from '@/pages/Mypage/components/ScoreSection/ScoreSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfoById } from '@/api/userApi';

interface UserPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const UserPageModal = ({ isOpen, onClose, userId }: UserPageModalProps) => {
  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="center">
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Header>
          <LeftSection>
            <BackButton onClick={handleClose}>
              <HiOutlineChevronLeft size={20} />
            </BackButton>
          </LeftSection>
          <CenterSection>유저 정보</CenterSection>
          <RightSection />
        </Header>
        <Content>
          <Suspense fallback={<LoadingSpinner />}>
            <UserPageContent userId={userId} />
          </Suspense>
        </Content>
      </Wrapper>
    </BaseModal>
  );
};

// 내부 컴포넌트로 분리하여 Suspense 내부에서 데이터 조회
const UserPageContent = ({ userId }: { userId: number }) => {
  const { data: profile } = useSuspenseQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserInfoById(userId),
  });

  return (
    <>
      <UserProfileSection userId={userId} />
      <ScoreWrapper>
        <ScoreSection userScore={profile?.userScore ?? 0} />
      </ScoreWrapper>
      <UserRecordSection userId={userId} />
      <UserReviewSection userId={userId} />
    </>
  );
};

export default UserPageModal;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  maxWidth: '720px',
  backgroundColor: colors.backgroundGray,
});

const Header = styled.header({
  height: '2.75rem', // 44px - 공용 헤더와 동일
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.gray200}`,
  padding: '0 16px',
  flexShrink: 0,
});

const LeftSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: '2.5rem',
  justifyContent: 'flex-start',
});

const BackButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: colors.black,
});

const CenterSection = styled.div({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  ...typography.h3,
});

const RightSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: '2.5rem',
  justifyContent: 'flex-end',
});

const Content = styled.div({
  flex: 1,
  overflowY: 'auto',
  backgroundColor: colors.backgroundGray,
  WebkitOverflowScrolling: 'touch',
  willChange: 'scroll-position',
  touchAction: 'pan-y',
  transform: 'translateZ(0)', // GPU 가속 활성화
});

const ScoreWrapper = styled.div({
  padding: `20px`,
});
