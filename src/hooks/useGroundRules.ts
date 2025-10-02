import { useQuery } from '@tanstack/react-query';
import { fetchGroundRules } from '@/api/groupApi';

export const useGroundRules = (groupId: number) => {
  return useQuery({
    queryKey: ['groundRules', groupId],
    queryFn: () => fetchGroundRules(Number(groupId)),
  });
};
