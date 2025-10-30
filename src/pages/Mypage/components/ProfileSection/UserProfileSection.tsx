import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import defaultUserImg from '@/assets/defaultUserImg.svg';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoById } from '@/api/userApi';

interface UserProfileSectionProps {
  userId: number;
}

const UserProfileSection = ({ userId }: UserProfileSectionProps) => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserInfoById(userId),
    enabled: !!userId,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !profile) return <div>프로필 정보를 불러오지 못했습니다.</div>;

  return (
    <Wrapper>
      <ProfileImage src={profile.profileImageUrl ?? defaultUserImg} alt="유저 프로필" />
      <ProfileInfo>
        <Nickname>{profile.nickname}</Nickname>
      </ProfileInfo>
    </Wrapper>
  );
};

export default UserProfileSection;

const Wrapper = styled.section({
  margin: `0 ${spacing.spacing4}px`,
  padding: `${spacing.spacing4}px 0`,
  display: 'flex',
  alignItems: 'center',
  gap: spacing.spacing2,
  backgroundColor: colors.backgroundGray,
});

const ProfileImage = styled.img({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
});

const ProfileInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing1,
  flex: 1,
});

const Nickname = styled.span({
  ...typography.h1,
});
