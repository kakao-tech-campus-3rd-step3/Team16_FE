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
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useState } from 'react';

const GroupPostPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useHeader({
    centerContent: '게시글 작성',
    leftContent: (
      //뒤로가기시 게시글 컴포넌트 렌더링
      <HiOutlineChevronLeft
        size={20}
        onClick={() => navigate(`/group/${groupId}`, { state: { activeTab: '게시판' } })}
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

  const { createGroupPost, isPosting } = useCreateGroupPost(Number(groupId));

  const requestUrl = `/image/presigned/group/${groupId}/posts`;
  const { uploadImagesAsync, isUploading } = useImageUpload({
    type: 'PROFILE',
    request_url: requestUrl,
  });

  const onSubmit = async (data: GroupPostFormData) => {
    try {
      if (imageFiles && imageFiles.length > 0) {
        console.log(imageFiles);
        data.imageUrls = await uploadImagesAsync(imageFiles);
        console.log('data.imageUrls', data.imageUrls);
      }
      await createGroupPost(data);
      alert('게시글 작성이 완료되었습니다!');
      navigate(`/group/${groupId}`, { state: { activeTab: '게시판' } });
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  if (isUploading || isPosting) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <TitleSection register={register} errors={errors} title={title} />
        <ContentSection register={register} errors={errors} content={content} />
        <ImagePicker setImageFiles={setImageFiles} imageFiles={imageFiles} />
        <PrimaryButton text="게시글 작성" onClick={handleSubmit(onSubmit)} />
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
