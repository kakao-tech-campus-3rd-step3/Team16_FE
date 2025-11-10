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
import CustomAlert from '@/components/common/CustomAlert';
import { useAlert } from '@/hooks/useAlert';

const completionUrl = '/users/profile-image';

interface ProfileData {
  nickname: string;
}

const ProfileEditPage = () => {
  const { isOpen: isAlertOpen, alertOptions, showAlert, closeAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageChanged, setImageChanged] = useState(false);
  const { profileImg, nickname, isLoading } = useUserProfile();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProfileData) => {
      // 이미지가 변경되지 않은 경우, 닉네임만 업데이트
      if (!imageChanged) {
        const newNickname = await updateNickname(data.nickname);
        return { newProfileImg: profileImg, newNickname };
      }

      // 이미지가 삭제된 경우
      if (selectedFile === null) {
        const [, newNickname] = await Promise.all([
          deleteProfileImg(),
          updateNickname(data.nickname),
        ]);
        return { newProfileImg: null, newNickname };
      }

      // 새 이미지가 선택된 경우
      const [newProfileImg, newNickname] = await Promise.all([
        uploadImageApi(selectedFile, {
          type: 'PROFILE',
          completionUrl,
          request_url: '/image/presigned',
        }),
        updateNickname(data.nickname),
      ]);
      return { newProfileImg, newNickname };
    },

    onSuccess: (result) => {
      queryClient.setQueryData(['userProfile'], [result.newProfileImg, result.newNickname]);
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigate(-1);
    },
    onError: () => {
      showAlert({ message: '업데이트 중 에러가 발생했습니다. 다시 시도해주세요.', type: 'error' });
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
      <ImgSection
        setSelectedFile={setSelectedFile}
        profileImgUrl={profileImg}
        setImageChanged={setImageChanged}
      />
      <Nickname register={register} errors={errors} nickname={nickname} />
      <CustomAlert
        isOpen={isAlertOpen}
        onClose={closeAlert}
        message={alertOptions.message}
        type={alertOptions.type}
        confirmText={alertOptions.confirmText}
      />
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
