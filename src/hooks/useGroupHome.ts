import { useQuery } from '@tanstack/react-query';
import { fetchGroupHome } from '@/api/groupApi';

export const useGroupHome = (groupId: number) => {
  return useQuery({
    queryKey: ['groupHome', groupId],
    queryFn: () => fetchGroupHome(groupId),
    enabled: !!groupId,
  });
};

export default useGroupHome;
