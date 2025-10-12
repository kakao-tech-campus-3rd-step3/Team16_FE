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

const MemberReview = () => {
  const [choice, setChoice] = useState<'positive' | 'negative' | null>(null);
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useHeader({ centerContent: '모임원 리뷰 남기기' });

  const { mutate, isPending } = useReview();

  const handleSubmit = () => {
    if (!choice) {
      setErrorMessage('리뷰 종류를 선택해주세요.');
      return;
    }
    setErrorMessage('');
    mutate({
      revieweeID: 1,
      content: '불성실합니다.',
      evaluation: 'NEGATIVE',
    });
  };

  return (
    <Wrapper>
      {isPending && <FullScreenLoader />}
      <ExplainText>김힘찬 모임원에 대한 솔직한 리뷰를 남겨주세요.</ExplainText>
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
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <PrimaryButton text="제출하기" onClick={handleSubmit} />
    </Wrapper>
  );
};

export default MemberReview;

const Wrapper = styled.div({
  backgroundColor: colors.white,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const ExplainText = styled.p({
  ...typography.body,
  textAlign: 'center',
  margin: '24px 0',
});
const ButtonSection = styled.div({
  display: 'flex',
  gap: 12,
  alignContent: 'center',
  justifyContent: 'center',
});

const ChoiceButton = styled.button<{ variant: 'positive' | 'negative'; active?: boolean }>(
  ({ variant, active }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    borderRadius: 9999,
    border: `2px solid ${active ? (variant === 'positive' ? colors.primary : colors.error) : '#ddd'}`,
    backgroundColor: active ? (variant === 'positive' ? '#E8F5E9' : '#FFEBEE') : '#fff',
    color: active ? (variant === 'positive' ? colors.primary : colors.error) : '#555',
    ...typography.body,
    cursor: 'pointer',
    transition: 'all 0.2s',
    svg: {
      fontSize: 18,
    },
  })
);

const InputBox = styled.textarea({
  minHeight: '240px',
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
