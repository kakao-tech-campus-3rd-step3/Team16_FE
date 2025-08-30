import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import useAuthStore from '@/stores/authStore';

const StudentPage = () => {
  const { verificationStatus } = useAuthStore();

  function Submit(){
    // 제출 로직
  }


  return (
    <Wrapper>
      <Description>학생증, 재학증명서, 입학증명서를 아래 예시처럼 제출해주세요.</Description>
      <ImageBox>
        <ImageIcon>신분증, 증명서 예시 이미지</ImageIcon>
      </ImageBox>
      <Notice>
        {verificationStatus === 'pending'
          ? '승인 여부 심사 중입니다.'
          : '24시간 내에 관리자가 승인 여부 심사합니다.'}
      </Notice>
      <SubmitButton onClick={Submit}>증명서류 제출하기</SubmitButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Description = styled.p`
  width: 90%;
  font-size: 14px;
  color: #666;
  margin-top: 50px;
  text-align: center;
`;

const ImageBox = styled.div`
  width: 90%;
  height: 30vh;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray400};
  font-size: 14px;
  margin-top: 15vh;
`;

const ImageIcon = styled.div`
  text-align: center;
`;

const Notice = styled.div`
  width: 90%;
  background: #eafbe7;
  color: #3cb371;
  font-size: 13px;
  padding: 15px 0;
  border-radius: 4px;
  margin-bottom: 32px;
  text-align: center;
  margin-top: 10vh;
`;

const SubmitButton = styled.button`
  width: 90%;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  margin-top: 12vh;
`;

export default StudentPage;
