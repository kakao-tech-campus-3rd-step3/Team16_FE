import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import UserProfileSection from './components/ProfileSection/UserProfileSection';
import UserRecordSection from './components/RecordSection/UserRecordSection';
import UserReviewSection from './components/ReviewSection/UserReviewSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Suspense } from 'react';

interface UserPageProps {
  userId: number;
}

const UserPage = ({ userId }: UserPageProps) => {
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
