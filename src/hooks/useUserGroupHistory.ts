import { useQuery } from '@tanstack/react-query';
import { getUserGroupHistory } from '@/api/userApi';
import useAuthStore from '@/stores/authStore';

export function useUserGroupHistory() {
  const { id: userId } = useAuthStore();

  return useQuery({
    queryKey: ['userGroupHistory', userId],
    queryFn: () => getUserGroupHistory(userId!),
    enabled: !!userId,
  });
}
