import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/userApi';
import useAuthStore from '@/stores/authStore';

const useUserInfo = () => {
  const { id: userId } = useAuthStore();
  return useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId!),
    enabled: !!userId,
  });
};

export default useUserInfo;
