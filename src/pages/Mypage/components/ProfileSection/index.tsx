import styled from '@emotion/styled';
import { IoSettingsOutline } from 'react-icons/io5';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';

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

const Wrapper = styled.section({
  margin: `0px ${spacing.spacing4}px`,
  padding: `${spacing.spacing4}px 0px`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.spacing2,
  backgroundColor: colors.backgroundGray,
});

const ProfileImage = styled.image({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: colors.gray300, //임시
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
  flexDirection: 'row',
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
