import styled from '@emotion/styled';
import { IoSettingsOutline } from 'react-icons/io5';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import defaultUserImg from '@/assets/defaultUserImg.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/userApi';

const MyProfileSection = () => {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['userProfile', 'me'],
    queryFn: getUserInfo,
  });

  return (
    <Wrapper>
      <ProfileImage src={profile.profileImageUrl ?? defaultUserImg} alt="내 프로필" />
      <ProfileInfo>
        <Nickname>{profile.nickname}</Nickname>
      </ProfileInfo>
      <SettingButton onClick={() => navigate('/setting')}>
        <IoSettingsOutline size={20} />
        설정
      </SettingButton>
    </Wrapper>
  );
};

export default MyProfileSection;

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

const SettingButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.spacing1,
  backgroundColor: colors.gray200,
  borderRadius: '24px',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
  ...typography.body,
  color: colors.black,
});
