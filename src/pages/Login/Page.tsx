import kakaoLoginBtn from '@/assets/kakao_login_button.svg';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import { getUserInfo } from '@/api/userApi';

const kakaoLoginURI = import.meta.env.VITE_KAKAO_LOGIN_URI;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUserInfo } = useAuthStore(); // zustand store에서 setAccessToken 함수 가져오기

  useEffect(() => {
    const accessToken = new URL(window.location.href).searchParams.get('token');
    if (accessToken) {
      setAccessToken(accessToken);
      // 사용자 정보 가져오고 유저정보 zustand에 저장
      getUserInfo().then((userInfo) => {
        setUserInfo(userInfo);
        navigate('/'); // 메인 페이지로 이동
      });
    }
  }, []);

  const handleLogin = () => {
    // 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoLoginURI;
  };
  return (
    <>
      <Wrapper>
        <Button onClick={handleLogin}>
          <KakaoImg src={kakaoLoginBtn} alt="카카오 로그인" />
        </Button>
      </Wrapper>
    </>
  );
};

const Button = styled.button`
  width: 80%;
  padding: 0;
  border: none;
  background: none;
`;

const KakaoImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Wrapper = styled.main`
  width: 100%;
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default LoginPage;
