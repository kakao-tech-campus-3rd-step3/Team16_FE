import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/userApi';

const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
    refetchInterval: 10000, // 10초마다 refetch
    refetchIntervalInBackground: true, // 백그라운드에서도 refetch
  });
};

export default useUserInfo;
