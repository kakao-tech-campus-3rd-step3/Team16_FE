import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchedule, updateSchedule, deleteSchedule } from '../api/scheduleApi';

export const useScheduleMutation = (groupId: number, planId?: number) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupSchedule', groupId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupPlan', groupId, planId] });
      queryClient.invalidateQueries({ queryKey: ['groupSchedule', groupId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupSchedule', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupPlan', groupId] });
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};
