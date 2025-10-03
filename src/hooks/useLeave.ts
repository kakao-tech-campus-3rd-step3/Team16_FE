import { useMutation } from '@tanstack/react-query';
import { postGroupReview } from '@/api/leaveApi';
import { leaveGroup } from '@/api/leaveApi';

interface LeavePayload {
  content: string;
  groupId: number;
}

export function useLeave() {
  return useMutation<void, Error, LeavePayload>({
    mutationFn: async ({ content, groupId }) => {
      await postGroupReview(content, groupId);
      await leaveGroup(groupId);
    },
  });
}
