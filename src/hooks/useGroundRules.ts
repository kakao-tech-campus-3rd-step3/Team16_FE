import { useQuery } from '@tanstack/react-query';
import { fetchGroundRules } from '@/api/groupApi';

export const useGroundRules = (groupId: string) => {
  return useQuery({
    queryKey: ['groundRules', groupId],
    queryFn: () => fetchGroundRules(Number(groupId)),
  });
};
