import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import NameSection from './components/NameSection';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import IntroSection from './components/IntroSection';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGroupApi } from '@/api/groupApi';
import { useNavigate } from 'react-router-dom';
import type { CreateGroupFormData } from './type';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  useHeader({ centerContent: '모임 만들기' });
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<CreateGroupFormData>({
    mode: 'onSubmit',
  });

  const name = watch('name') || '';
  const intro = watch('intro') || '';

  const { mutate } = useMutation({
    mutationFn: (data: CreateGroupFormData) => createGroupApi(data),
    onSuccess: (response) => {
      alert('모임이 성공적으로 생성되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      console.log(queryClient.getQueryData(['userInfo']));
      navigate(`/group/${response.groupId}`);
    },
    onError: () => {
      alert('모임 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = (data: CreateGroupFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <NameSection register={register} errors={errors} name={name} />
        <IntroSection register={register} errors={errors} intro={intro} />
        <PrimaryButton text="모임 만들기" onClick={handleSubmit(onSubmit)} />
      </Wrapper>
    </form>
  );
};

const Wrapper = styled.div({
  padding: spacing.spacing4,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing4,
});

export default CreateGroupPage;
