import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import TextLength from '@/components/common/TextLength';
import type { NameSectionProps } from '../type';

const MAX_LENGTH = 10;

const NameSection = ({ register, errors, groupName }: NameSectionProps) => {
  return (
    <Wrapper>
      <Title>모임명</Title>
      <GroupNameInput
        {...register('groupName', {
          required: '모임명을 입력해주세요.',
          minLength: {
            value: 2,
            message: '최소 2자 이상 입력해주세요.',
          },
          maxLength: {
            value: MAX_LENGTH,
            message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
          },
        })}
        placeholder="모임명을 입력해주세요"
        hasError={!!errors.groupName}
      />
      <Bottom>
        {errors.groupName && <ErrorMessage>{String(errors.groupName.message)}</ErrorMessage>}
        <TextLength currentLength={groupName.length} maxLength={MAX_LENGTH} />
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

const GroupNameInput = styled.input<{ hasError?: boolean }>(({ hasError }) => ({
  width: '100%',
  padding: '12px 16px',
  backgroundColor: hasError ? colors.errorLight : colors.gray100,
  border: hasError ? `1px solid ${colors.error}` : '1px solid #ccc',
  borderRadius: '8px',
  boxSizing: 'border-box',
  outline: 'none',
  ...typography.body,
}));

const ErrorMessage = styled.span({
  ...typography.caption,
  color: colors.error,
  marginLeft: spacing.spacing1,
});

const Bottom = styled.div({
  display: 'flex',
});

export default NameSection;
