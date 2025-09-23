import { useQuery } from '@tanstack/react-query';
import { getGroupPlan } from '@/api/groupScheduleApi';
import type { GroupPlan } from '@/api/groupScheduleApi';

export const useGroupPlan = (groupId: number, planId: number) => {
  const { data, isLoading } = useQuery<GroupPlan>({
    queryKey: ['groupPlan', groupId, planId],
    queryFn: () => getGroupPlan(groupId, planId),
  });
  return { data, isLoading };
};
