import { useMutation } from '@tanstack/react-query';
// import { postGroupReview } from '@/api/leaveApi';
import { leaveGroup } from '@/api/leaveApi';

export function useLeave() {
  return useMutation<void, Error, { content: string; groupId: number }>({
    mutationFn: async ({ groupId }) => {
      // await postGroupReview(content, groupId);
      await leaveGroup(groupId);
    },
  });
}
