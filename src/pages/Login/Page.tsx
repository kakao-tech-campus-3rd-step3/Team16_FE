import kakaoLoginBtn from '@/assets/kakao_login_button.svg';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '@/stores/authStore';

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const VITE_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore(); // zustand store에서 setAccessToken 함수 가져오기

  useEffect(() => {
    // URL에서 인가코드 확인
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      console.log('인가코드 받음:', code);
      handleKakaoCallback(code);
    }
  }, []);

  const handleKakaoCallback = async (code: string) => {
    try {
      // axios로 백엔드 API에 인가코드 전송
      const response = await axios.post('/api/auth/kakao-login', {
        code,
      });

      const result = response.data;

      // 로그인 성공 - zustand store에 액세스 토큰 저장
      setAccessToken(result.accessToken);

      navigate('/');
    } catch (error: any) {
      console.error('카카오 로그인 처리 에러:', error);

      // axios 에러 처리
      if (error.response) {
        // 서버에서 에러 응답을 받은 경우
        const errorMessage = error.response.data?.message || '로그인 처리 실패';
        alert(errorMessage);
      } else {
        // 네트워크 에러 등
        alert('로그인 처리 중 오류가 발생했습니다.');
      }
    }
  };

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&VITE_REDIRECT_URI=${VITE_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
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
