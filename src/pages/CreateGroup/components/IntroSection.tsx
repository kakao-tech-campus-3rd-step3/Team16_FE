import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import TextLengthValidator from '@/components/common/TextLength';
import type { IntroSectionProps } from '../type';

const MAX_LENGTH = 200;

const IntroSection = ({ register, errors, groupIntro }: IntroSectionProps) => {
  return (
    <Wrapper>
      <Title>모임 소개</Title>
      <GroupIntroInput
        {...register('groupIntro', {
          required: '모임 소개를 입력해주세요.',
          minLength: {
            value: 8,
            message: '최소 8자 이상 입력해주세요.',
          },
          maxLength: {
            value: MAX_LENGTH,
            message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
          },
        })}
        placeholder="모임에 대한 소개를 입력해주세요"
      />
      <Bottom>
        {errors.groupIntro && <ErrorMessage>{String(errors.groupIntro.message)}</ErrorMessage>}
        <TextLengthValidator currentLength={groupIntro.length} maxLength={200} />
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  gap: spacing.spacing2,
});

const Title = styled.h2({
  ...typography.h3,
  marginLeft: spacing.spacing1,
});

const GroupIntroInput = styled.textarea({
  width: '100%',
  height: '200px',
  padding: '12px 16px',
  backgroundColor: colors.gray100,
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxSizing: 'border-box',
  outline: 'none',
  resize: 'none',
  ...typography.body,
  fontFamily: typography.fontFamily,
});

const ErrorMessage = styled.span({
  ...typography.caption,
  color: colors.error,
  marginLeft: spacing.spacing1,
});

const Bottom = styled.div({
  display: 'flex',
});

export default IntroSection;
