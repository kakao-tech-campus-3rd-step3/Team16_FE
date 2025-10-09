import kakaoLoginBtn from '@/assets/kakao_login_button.svg';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import { getUserInfo } from '@/api/userApi';
import { jwtDecode } from 'jwt-decode';

const kakaoLoginURI = import.meta.env.VITE_KAKAO_LOGIN_URI;

interface JwtPayload {
  sub: string; // userId
  kakaoId: string;
  role: string;
  iat: number;
  exp: number;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUserInfo } = useAuthStore(); // zustand store에서 setAccessToken 함수 가져오기

  useEffect(() => {
    // ✅ 백엔드에서 쿼리 파라미터로 token, user를 함께 내려주는 구조 가정
    const token = new URL(window.location.href).searchParams.get('token');
    const userParam = new URL(window.location.href).searchParams.get('user');

    if (!token) return;

    setAccessToken(token);

    // ✅ 1. user 객체가 응답에 포함되어 있다면 바로 zustand에 저장
    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        setUserInfo(parsedUser);
        navigate('/');
        return;
      } catch (err) {
        console.error('유저 정보 파싱 실패:', err);
      }
    }

    // ✅ 2. user 객체가 없다면 JWT decode로 userId 추출 후 API로 조회
    const { sub: userId } = jwtDecode<JwtPayload>(token);

    getUserInfo(userId)
      .then((userInfo) => {
        setUserInfo(userInfo);
        navigate('/');
      })
      .catch((err) => {
        console.error('유저 정보 불러오기 실패:', err);
        navigate('/'); // 실패 시에도 메인 이동
      });
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
