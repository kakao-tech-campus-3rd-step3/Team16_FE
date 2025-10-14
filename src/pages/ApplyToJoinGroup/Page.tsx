import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import styled from '@emotion/styled';
import TextLengthValidator from '@/components/common/TextLength';
import { useForm } from 'react-hook-form';
import { useHeader } from '@/hooks/useHeader';
import { useParams } from 'react-router-dom';
import PrimaryButton from '@/components/common/PrimaryButton';
import useApplyToJoinGroup from './hooks/useApplyToJoinGroup';
import { ErrorMessage } from '@/components/common/ErrorMessage';

const MAX_LENGTH = 200;
const MIN_LENGTH = 8;

const ApplyToJoinGroupPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<{ intro: string }>({
    mode: 'onSubmit',
  });
  const intro = watch('intro') || '';
  const { groupId } = useParams();

  useHeader({ centerContent: '모임 가입 신청' });

  const { mutate } = useApplyToJoinGroup();

  const onSubmit = (data: { intro: string }) => {
    mutate({ groupId: Number(groupId), intro: data.intro });
  };

  return (
    <Wrapper>
      <Title>본인 소개</Title>
      <GroupIntroInput
        {...register('intro', {
          required: '본인 소개를 입력해주세요.',
          minLength: {
            value: MIN_LENGTH,
            message: `최소 ${MIN_LENGTH}자 이상 입력해주세요.`,
          },
          maxLength: {
            value: MAX_LENGTH,
            message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
          },
        })}
        placeholder="본인에 대한 소개를 입력해주세요"
      />
      <Bottom>
        {errors.intro?.message && <ErrorMessage>{String(errors.intro.message)}</ErrorMessage>}
        <TextLengthValidator currentLength={intro.length} maxLength={MAX_LENGTH} />
      </Bottom>
      <PrimaryButton text="신청하기" onClick={handleSubmit(onSubmit)} />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  gap: spacing.spacing2,
  display: 'flex',
  flexDirection: 'column',
  padding: spacing.spacing4,
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

const Bottom = styled.div({
  display: 'flex',
});

export default ApplyToJoinGroupPage;
