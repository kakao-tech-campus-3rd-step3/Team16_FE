import { useQuery } from '@tanstack/react-query';
import { fetchGroupSchedule } from '@/api/groupApi';

export const useGroupSchedule = (groupId: number) => {
  return useQuery({
    queryKey: ['groupSchedule', groupId],
    queryFn: () => fetchGroupSchedule(Number(groupId)),
  });
};
