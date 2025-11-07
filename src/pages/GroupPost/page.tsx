import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import TitleSection from './components/TitleSection';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import ContentSection from './components/ContentSection';
import { useForm } from 'react-hook-form';
import useCreateGroupPost from './hooks/useCreateGroupPost';
import { useNavigate, useParams } from 'react-router-dom';
import { useImageUpload } from '@/hooks/useImageUpload';
import type { GroupPostFormData } from './type';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import ImagePicker from './components/ImagePicker';
import { useState } from 'react';

const GroupPostPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useHeader({
    centerContent: '게시글 작성',
    leftContent: (
      //뒤로가기시 게시글 컴포넌트 렌더링
      <HiOutlineChevronLeft
        size={20}
        onClick={() =>
          navigate(`/group/${groupId}`, { state: { activeTab: '게시판' }, replace: true })
        }
      />
    ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<GroupPostFormData>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      content: '',
      imageUrls: [],
    },
  });

  const formValues = watch();
  const { title, content } = formValues;

  const { createGroupPost } = useCreateGroupPost(Number(groupId));

  const requestUrl = `/image/presigned/group/${groupId}/posts`;
  const { uploadImagesAsync, isUploading } = useImageUpload({
    type: 'PROFILE',
    request_url: requestUrl,
  });

  const onSubmit = async (data: GroupPostFormData) => {
    // 이미 제출 중이면 리턴
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (imageFiles && imageFiles.length > 0) {
        console.log(imageFiles);
        data.imageUrls = await uploadImagesAsync(imageFiles);
      }
      navigate(`/group/${groupId}`, { state: { activeTab: '게시판' }, replace: true });
      await createGroupPost({ ...data, imageFiles });
      alert('게시글 작성이 완료되었습니다!');
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || isUploading;
  const isFormValid = title?.trim().length > 0 && content?.trim().length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <TitleSection register={register} errors={errors} title={title} />
        <ContentSection register={register} errors={errors} content={content} />
        <ImagePicker setImageFiles={setImageFiles} imageFiles={imageFiles} />
        <PrimaryButton
          text={isLoading ? '게시글 작성 중...' : '게시글 작성'}
          onClick={handleSubmit(onSubmit)}
          disabled={!isFormValid || isLoading}
        />
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

export default GroupPostPage;
