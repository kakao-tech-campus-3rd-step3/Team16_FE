import styled from '@emotion/styled';
import ImgSection from './components/ImgSection';
import Nickname from './components/Nickname';
import { useHeader } from '@/hooks/useHeader';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { deleteProfileImg, updateNickname } from '@/api/userApi';
import { uploadImageApi } from '@/api/imageUploader';
import { useMutation } from '@tanstack/react-query';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const completionUrl = '/users/profile-image';

interface ProfileData {
  nickname: string;
}

const ProfileEditPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { profileImg, nickname, isLoading } = useUserProfile();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProfileData) => {
      if (selectedFile === null) {
        const [, newNickname] = await Promise.all([
          deleteProfileImg(),
          updateNickname(data.nickname),
        ]);
        return { newProfileImg: null, newNickname };
      } else {
        const [newProfileImg, newNickname] = await Promise.all([
          uploadImageApi(selectedFile, {
            type: 'PROFILE',
            completionUrl,
            request_url: '/image/presigned',
          }),
          updateNickname(data.nickname),
        ]);
        return { newProfileImg, newNickname };
      }
    },

    onSuccess: (result) => {
      queryClient.setQueryData(['userProfile'], [result.newProfileImg, result.newNickname]);
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigate('/setting', { replace: true });
    },
    onError: () => {
      alert('업데이트 중 에러가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit = (data: ProfileData) => {
    mutate(data);
  };

  useHeader({
    centerContent: '프로필 수정',
    rightContent: <div onClick={handleSubmit(onSubmit)}>완료</div>,
  });

  if (isPending || isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Wrapper>
      <ImgSection setSelectedFile={setSelectedFile} profileImgUrl={profileImg} />
      <Nickname register={register} errors={errors} nickname={nickname} />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30px',
  gap: '40px',
});

export default ProfileEditPage;
