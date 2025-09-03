import styled from '@emotion/styled';
import { IoSettingsOutline } from 'react-icons/io5';

const ProfileSection = () => {
  return (
    <Wrapper>
      <ProfileImage />
      <ProfileInfo>
        <Nickname>나는야 산악왕</Nickname>
      </ProfileInfo>
      <SettingButton>
        <IoSettingsOutline size={20} />
        설정
      </SettingButton>
    </Wrapper>
  );
};

export default ProfileSection;

const Wrapper = styled.main(({ theme }) => ({
  margin: `0px ${theme.spacing.spacing4}px`,
  padding: `${theme.spacing.spacing4}px 0px`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.spacing2,
  backgroundColor: theme.colors.gray50,
}));

const ProfileImage = styled.image(({ theme }) => ({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: theme.colors.gray300, //임시
}));

const ProfileInfo = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.spacing1,
  flex: 1,
}));

const Nickname = styled.span(({ theme }) => ({
  ...theme.typography.h1,
}));

const SettingButton = styled.button(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing.spacing1,
  backgroundColor: theme.colors.gray200,
  borderRadius: '24px',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
  ...theme.typography.body,
  color: theme.colors.black,
}));
