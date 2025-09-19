import { fetchProfileImageUrl, fetchNickname } from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => Promise.all([fetchProfileImageUrl(), fetchNickname()]),
    staleTime: Infinity,
  });

  const [profileImg, nickname] = data || [];

  return { profileImg, nickname, isLoading };
};
