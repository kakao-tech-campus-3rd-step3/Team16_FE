import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getGroupPlan } from '@/api/groupScheduleApi';
import type { GroupPlan } from '@/api/groupScheduleApi';

type UseGroupPlanOptions = Omit<
  UseQueryOptions<GroupPlan, Error, GroupPlan>,
  'queryKey' | 'queryFn'
>;

export const useGroupPlan = (groupId: number, planId: number, options?: UseGroupPlanOptions) => {
  const { data, isLoading } = useQuery<GroupPlan>({
    queryKey: ['groupPlan', groupId, planId],
    queryFn: () => getGroupPlan(groupId, planId),
    ...options,
  });

  return { data, isLoading };
};
