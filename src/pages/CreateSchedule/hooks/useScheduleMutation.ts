import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchedule, updateSchedule, deleteSchedule } from '../api/scheduleApi';
import { useNavigate } from 'react-router-dom';

export const useScheduleMutation = (groupId: number, planId?: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      alert('일정이 생성되었습니다.');
      navigate(-1);
    },
    onError: () => {
      alert('일정 생성 실패');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      alert('일정이 수정되었습니다.');
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ['groupPlan', groupId, planId] });
    },
    onError: () => {
      alert('일정 수정 실패');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      alert('일정이 삭제되었습니다.');
    },
    onError: () => {
      alert('일정 삭제 실패');
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};
