import styled from '@emotion/styled';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useState } from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useHeader } from '@/hooks/useHeader';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { useReview } from '@/hooks/useReveiw';
import FullScreenLoader from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useLocation, useNavigate } from 'react-router-dom';

const MemberReview = () => {
  const [choice, setChoice] = useState<'positive' | 'negative' | null>(null);
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { groupId, targetUserId, targetNickname } = location.state || {};

  useHeader({ centerContent: '모임원 리뷰 남기기' });

  const { mutate, isPending } = useReview();

  const handleSubmit = () => {
    if (!choice) {
      setErrorMessage('리뷰 종류를 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      setErrorMessage('리뷰 내용을 입력해주세요.');
      return;
    }
    setErrorMessage('');
    mutate(
      {
        groupId,
        revieweeId: targetUserId,
        content,
        evaluation: choice === 'positive' ? 'POSITIVE' : 'NEGATIVE',
      },
      {
        onSuccess: () => {
          alert('리뷰가 성공적으로 등록되었습니다.');
          navigate('/');
        },
      }
    );
  };

  return (
    <Wrapper>
      {isPending && <FullScreenLoader />}
      <ExplainText>{targetNickname} 모임원에 대한 솔직한 리뷰를 남겨주세요.</ExplainText>
      <ButtonSection>
        <ChoiceButton
          variant="positive"
          active={choice === 'positive'}
          onClick={() => setChoice(choice === 'positive' ? null : 'positive')}
        >
          <FaThumbsUp /> 긍정적이에요
        </ChoiceButton>
        <ChoiceButton
          variant="negative"
          active={choice === 'negative'}
          onClick={() => setChoice(choice === 'negative' ? null : 'negative')}
        >
          <FaThumbsDown /> 아쉬워요
        </ChoiceButton>
      </ButtonSection>

      <InputBox
        placeholder="리뷰 내용을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ErrorMessageWrapper>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ErrorMessageWrapper>

const ErrorMessageWrapper = styled.div({
  marginLeft: spacing.spacing4,
});
