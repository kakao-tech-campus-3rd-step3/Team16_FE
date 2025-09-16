import { useHeader } from '@/hooks/useHeader';
import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const LeavePage = () => {
  useHeader({ leftContent: null, centerContent: '탈퇴하기' });
  const navigate = useNavigate();
  const [review, setReview] = useState('');

  const handleSubmit = async () => {
    try {
      // 1) 리뷰 먼저 저장
      // await postGroupReview(review);
      await axios.post('/api/groups/review', { content: review });

      // 2) 리뷰 저장 성공 시 탈퇴 처리
      // await postLeaveGroup();
      await axios.post('/api/groups/alarm/leave');

      alert('리뷰가 제출되고 모임에서 탈퇴되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error(error);
      alert('처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Wrapper>
      <Title>이 모임은 어떠셨나요?</Title>
      <Content>
        모임에 대한 솔직한 리뷰를 남겨주시면<br></br>다른 모임원들에게 큰 도움이 됩니다.
      </Content>
      <InputBox
        placeholder="모임에 대한 리뷰를 솔직하게 남겨주세요"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <ButtonWrapper>
        <CancelButton onClick={() => navigate(-1)}>취소하기</CancelButton>
        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </ButtonWrapper>
      <ExplainText>*제출하기 버튼을 누르면 모임에서 탈퇴됩니다.</ExplainText>
    </Wrapper>
  );
};

export default LeavePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.div({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  marginTop: `${spacing.spacing6}px`,
  ...typography.h2,
});

const Content = styled.div({
  display: 'flex',
  textAlign: 'center',
  ...typography.body,
  justifyContent: 'center',
  alignContent: 'center',
  margin: `${spacing.spacing4}px`,
  color: colors.gray800,
});

const InputBox = styled.textarea({
  minHeight: '320px',
  backgroundColor: colors.gray100,
  borderRadius: '8px',
  padding: `${spacing.spacing4}px`,
  margin: `${spacing.spacing4}px`,
  border: 'none',
  outline: 'none',
  resize: 'none',
  ...typography.body,
  color: colors.black,
  fontFamily: 'inherit',
});

const ButtonWrapper = styled.div({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: `${spacing.spacing3}px`,
  width: '100%',
  maxWidth: '720px',
  padding: `${spacing.spacing4}px`,
  backgroundColor: colors.white,
  boxSizing: 'border-box',
});

const CancelButton = styled.button({
  flex: 1,
  color: colors.black,
  backgroundColor: colors.gray200,
  padding: `${spacing.spacing4}px 0`,
  border: 'none',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  borderRadius: '8px',
  ...typography.body,
});

const SubmitButton = styled.button({
  flex: 2,
  color: colors.white,
  backgroundColor: colors.black,
  padding: `${spacing.spacing4}px 0`,
  border: 'none',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  ...typography.body,
});

const ExplainText = styled.div({
  ...typography.small,
  color: colors.gray700,
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignContent: 'center',
});
