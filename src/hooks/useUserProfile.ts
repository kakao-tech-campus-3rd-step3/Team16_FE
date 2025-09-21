import { fetchProfileImage, fetchNickname } from '../api/userApi';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  const { data: profileImg } = useQuery({
    queryKey: ['profileImage'],
    queryFn: fetchProfileImage,
  });
  const { data: nickname } = useQuery({
    queryKey: ['nickname'],
    queryFn: fetchNickname,
  });
  return { profileImg, nickname, isLoading: !profileImg || !nickname };
};
