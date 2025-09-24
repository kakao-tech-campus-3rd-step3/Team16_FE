import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import TextLengthValidator from '@/components/common/TextLength';
import { Controller } from 'react-hook-form';

const MAX_LENGTH = 200;

interface DescriptionProps {
  control: any;
}

const Description = ({ control }: DescriptionProps) => {
  return (
    <Wrapper>
      <Controller
        name="description"
        control={control}
        rules={{
          maxLength: {
            value: MAX_LENGTH,
            message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <GroupIntroInput
              {...field}
              placeholder="일정에 대한 설명을 입력해주세요"
              maxLength={MAX_LENGTH}
            />
            <Bottom>
              {error?.message && <ErrorMessage>{String(error.message)}</ErrorMessage>}
              <TextLengthValidator currentLength={field.value.length} maxLength={MAX_LENGTH} />
            </Bottom>
          </>
        )}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  gap: spacing.spacing2,
  display: 'flex',
  flexDirection: 'column',
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

export default Description;
