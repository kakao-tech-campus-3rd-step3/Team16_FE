import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import TitleSection from '../GroupPost/components/TitleSection';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import ContentSection from '../GroupPost/components/ContentSection';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useImageUpload } from '@/hooks/useImageUpload';
import type { GroupPostFormData } from '../GroupPost/type';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import ImagePicker from '../GroupPost/components/ImagePicker';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupPost } from '@/api/groupApi';
import { useUpdateGroupPost } from './hooks/useUpdateGroupPost';
import { useQueryClient } from '@tanstack/react-query';

const EditGroupPostPage = () => {
  const navigate = useNavigate();
  const { groupId, postId } = useParams();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  useHeader({
    centerContent: '게시글 수정',
    leftContent: (
      <HiOutlineChevronLeft
        size={20}
        onClick={() =>
          navigate(`/group/${groupId}`, { state: { activeTab: '게시판' }, replace: true })
        }
      />
    ),
  });

  // 기존 게시글 데이터 조회
  const { data: postData, isPending: isLoadingPost } = useQuery({
    queryKey: ['groupPost', Number(postId)],
    queryFn: () => fetchGroupPost(Number(groupId), Number(postId)),
    enabled: !!postId && !!groupId,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<GroupPostFormData>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      content: '',
      imageUrls: [],
    },
  });

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (postData) {
      setValue('title', postData.title || '');
      setValue('content', postData.content || '');
      setExistingImages(postData.imageUrls || []);
    }
  }, [postData, setValue]);

  const formValues = watch();
  const { title, content } = formValues;

  const requestUrl = `/image/presigned/group/${groupId}/posts`;
  const { uploadImagesAsync, isUploading } = useImageUpload({
    type: 'PROFILE',
    request_url: requestUrl,
  });

  // 게시글 수정 mutation (낙관적 업데이트 포함)
  const { updatePost } = useUpdateGroupPost(Number(groupId));

  const onSubmit = async (data: GroupPostFormData) => {
    // 이미 제출 중이면 리턴
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      let finalImageUrls = [...existingImages];

      // 새로운 이미지가 있으면 업로드
      if (imageFiles && imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesAsync(imageFiles);
        finalImageUrls = [...finalImageUrls, ...uploadedUrls];
      }
      navigate(`/group/${groupId}`, { state: { activeTab: '게시판' }, replace: true });

      await updatePost({
        postId: Number(postId),
        title: data.title,
        content: data.content,
        imageUrls: finalImageUrls.length > 0 ? finalImageUrls : [],
        imageFiles: imageFiles, // 낙관적 업데이트용 임시 이미지
      });
      queryClient.invalidateQueries({ queryKey: ['groupPost', Number(postId)] });
      alert('게시글 수정이 완료되었습니다!');
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || isUploading;
  const isFormValid = title?.trim().length > 0 && content?.trim().length > 0;

  if (isLoadingPost) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <TitleSection register={register} errors={errors} title={title} />
        <ContentSection register={register} errors={errors} content={content} />
        <ImagePicker
          setImageFiles={setImageFiles}
          imageFiles={imageFiles}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
        />
        <PrimaryButton
          text={isLoading ? '게시글 수정 중...' : '게시글 수정'}
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

export default EditGroupPostPage;
