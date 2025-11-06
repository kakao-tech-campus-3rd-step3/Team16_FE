import styled from '@emotion/styled';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/common/ErrorMessage';

const MIN_LENGTH = 2;
const MAX_LENGTH = 10;

type ProfileData = {
  nickname: string;
};

interface NicknameProps {
  register: UseFormRegister<ProfileData>;
  errors: FieldErrors<ProfileData>;
  nickname: string;
}

const Nickname = ({ register, errors, nickname }: NicknameProps) => {
  return (
    <Wrapper>
      <Input
        {...register('nickname', {
          required: '닉네임을 입력해주세요.',
          minLength: {
            value: MIN_LENGTH,
            message: `최소 ${MIN_LENGTH}자 이상 입력해주세요.`,
          },
          maxLength: {
            value: MAX_LENGTH,
            message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
          },
        })}
        defaultValue={nickname}
        placeholder="닉네임을 입력해주세요"
      />
      {errors.nickname?.message && <ErrorMessage>{String(errors.nickname.message)}</ErrorMessage>}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const Input = styled.input({
  padding: '12px 16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '80%',
  boxSizing: 'border-box',
  fontSize: '16px',
  textAlign: 'center',
});

export default Nickname;
