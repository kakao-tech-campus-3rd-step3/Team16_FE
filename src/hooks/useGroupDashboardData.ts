import { useQuery } from '@tanstack/react-query';
import { fetchGroundRules, fetchGroupSchedule } from '@/api/groupApi';

export const useGroupDashboardData = (groupId: string) => {
  const { data: groundRules, isLoading: isGroundRulesLoading } = useQuery({
    queryKey: ['groundRules', groupId],
    queryFn: () => fetchGroundRules(Number(groupId)),
  });

  const { data: groupSchedule, isLoading: isGroupScheduleLoading } = useQuery({
    queryKey: ['groupSchedule', groupId],
    queryFn: () => fetchGroupSchedule(Number(groupId)),
  });

  return {
    groundRules,
    groupSchedule,
    isDashBoardLoading: isGroundRulesLoading || isGroupScheduleLoading,
  };
};
