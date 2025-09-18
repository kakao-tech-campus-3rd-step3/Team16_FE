import { fetchProfileImageUrl, fetchNickname } from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  const { data: profileImg, isLoading: isLoadingProfileImg } = useQuery({
    queryKey: ['profileImg'],
    queryFn: fetchProfileImageUrl,
    staleTime: Infinity,
  });
  const { data: nickname, isLoading: isLoadingNickname } = useQuery({
    queryKey: ['nickname'],
    queryFn: fetchNickname,
    staleTime: Infinity,
  });
  return { profileImg, nickname, isLoading: isLoadingProfileImg || isLoadingNickname };
};
