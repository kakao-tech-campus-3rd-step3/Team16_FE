import { postGroupPostComment } from '@/api/groupPostCommentsApi';
import { useMutation } from '@tanstack/react-query';

export const usePostComment = (postId: number) => {
  return useMutation({
    mutationFn: (content: string) => postGroupPostComment(postId, content),
  });
};
