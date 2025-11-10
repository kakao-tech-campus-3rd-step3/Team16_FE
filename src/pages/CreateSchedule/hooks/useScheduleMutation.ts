import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSchedule, updateSchedule, deleteSchedule } from '../api/scheduleApi';
import { useNavigate } from 'react-router-dom';

export const useScheduleMutation = (
  groupId: number,
  planId?: number,
  showAlert?: (options: { message: string; type: 'success' | 'error' }) => void
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      if (showAlert) {
        showAlert({ message: '일정이 생성되었습니다.', type: 'success' });
      }
      navigate(-1);
    },
    onError: () => {
      if (showAlert) {
        showAlert({ message: '일정 생성 실패', type: 'error' });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      if (showAlert) {
        showAlert({ message: '일정이 수정되었습니다.', type: 'success' });
      }
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ['groupPlan', groupId, planId] });
    },
    onError: () => {
      if (showAlert) {
        showAlert({ message: '일정 수정 실패', type: 'error' });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      if (showAlert) {
        showAlert({ message: '일정이 삭제되었습니다.', type: 'success' });
      }
    },
    onError: () => {
      if (showAlert) {
        showAlert({ message: '일정 삭제 실패', type: 'error' });
      }
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};
