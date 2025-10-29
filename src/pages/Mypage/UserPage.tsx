import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import UserProfileSection from './components/ProfileSection/UserProfileSection';
import UserRecordSection from './components/RecordSection/UserRecrodSection';
import UserReviewSection from './components/ReviewSection/UserReviewSection';

interface UserPageProps {
  userId: number;
}

const UserPage = ({ userId }: UserPageProps) => {
  return (
    <Wrapper>
      <UserProfileSection userId={userId} />
      <UserRecordSection userId={userId} />
      <UserReviewSection userId={userId} />
    </Wrapper>
  );
};

export default UserPage;

const Wrapper = styled.div({
  backgroundColor: colors.backgroundGray,
  minHeight: '100vh',
});
