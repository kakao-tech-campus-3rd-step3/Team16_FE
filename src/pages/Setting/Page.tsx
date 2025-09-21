import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';
import defaultUserImg from '@/assets/defaultUserImg.svg';

const SettingPage = () => {
  const { profileImg, nickname, isLoading } = useUserProfile();
  const navigate = useNavigate();

  const editProfile = () => {
    navigate('/profile-edit');
  };

  const logout = () => {
    //로그아웃 처리
  };

  const deleteAccount = () => {
    //회원탈퇴 처리
  };

  const options = [
    { label: '프로필 수정', action: editProfile },
    { label: '로그아웃', action: logout },
    { label: '회원탈퇴', action: deleteAccount },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg src={profileImg ?? defaultUserImg} />
        <Nickname>{nickname}</Nickname>
      </ProfileSection>

      {options.map((option) => (
        <Option key={option.label} onClick={option.action}>
          <span style={{ paddingLeft: '15px' }}>{option.label}</span>
        </Option>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div({});

const ProfileSection = styled.div({
  height: '250px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  borderBottom: '1px solid #eee',
});

const ProfileImg = styled.img({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  marginTop: '30px',
  objectFit: 'cover',
});

const Nickname = styled.div({
  ...typography.h1,
  color: colors.black,
  marginBottom: '20px',
});

const Option = styled.div({
  ...typography.body,
  justifyContent: 'center',
  padding: '20px 0',
  borderBottom: '1px solid #eee',
});

export default SettingPage;
