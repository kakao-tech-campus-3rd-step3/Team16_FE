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
import ImagePicker from './components/ImagePicker';
import { useState } from 'react';
import { uploadImageApi } from '@/api/imageUploader';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const requestUrl = `/image/presigned/groups`;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateGroupFormData) => createGroupApi(data),
    onSuccess: (response) => {
      alert('모임이 성공적으로 생성되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigate(`/group/${response.groupId}`, { replace: true });
    },
    onError: () => {
      alert('모임 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = async (data: CreateGroupFormData) => {
    // 이미 제출 중이면 리턴
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // 이미지가 있으면 업로드
      if (imageFiles.length > 0) {
        const fileName = await uploadImageApi(imageFiles[0], {
          type: 'PROFILE',
          request_url: requestUrl,
        });
        data.fileName = fileName;
      }

      mutate(data);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const isLoading = isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <NameSection register={register} errors={errors} name={name} />
        <IntroSection register={register} errors={errors} intro={intro} />
        <ImagePicker setImageFiles={setImageFiles} imageFiles={imageFiles} />
        <PrimaryButton 
          text={isLoading ? "모임 만드는 중..." : "모임 만들기"}
          onClick={handleSubmit(onSubmit)} 
          disabled={isLoading}
        />
        {isLoading && <LoadingSpinner />}
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
