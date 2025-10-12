import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import TextLength from '@/components/common/TextLength';
import type { TitleSectionProps } from '../type';
import { ErrorMessage } from '@/components/common/ErrorMessage';

const MAX_LENGTH = 10;
const MIN_LENGTH = 2;

const TitleSection = ({ register, errors, title }: TitleSectionProps) => {
  return (
    <Wrapper>
      <Title>제목</Title>
      <TitleInput
        {...register('title', {
          required: '제목을 입력해주세요.',
          minLength: {
            value: MIN_LENGTH,
            message: `최소 ${MIN_LENGTH}자 이상 입력해주세요.`,
          },
          maxLength: {
            value: MAX_LENGTH,
            message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
          },
        })}
        placeholder="제목을 입력해주세요"
      />
      <Bottom>
        {errors.title?.message && <ErrorMessage>{String(errors.title.message)}</ErrorMessage>}
        <TextLength currentLength={title.length} maxLength={MAX_LENGTH} />
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  gap: spacing.spacing2,
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2({
  ...typography.h3,
  marginLeft: spacing.spacing1,
});

const TitleInput = styled.input({
  width: '100%',
  padding: '12px 16px',
  backgroundColor: colors.gray100,
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxSizing: 'border-box',
  outline: 'none',
  ...typography.body,
});

const Bottom = styled.div({
  display: 'flex',
});

export default TitleSection;
