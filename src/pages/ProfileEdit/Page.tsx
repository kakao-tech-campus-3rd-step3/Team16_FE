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
          uploadImageApi(selectedFile, { type: 'PROFILE', completionUrl }),
          updateNickname(data.nickname),
        ]);
        return { newProfileImg, newNickname };
      }
    },

    onSuccess: (result) => {
      queryClient.setQueryData(['profileImg'], result.newProfileImg);
      queryClient.setQueryData(['nickname'], result.newNickname);
      navigate('/setting');
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

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isPending) {
    return <div>추후에 Suspense를 적용하자</div>;
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
