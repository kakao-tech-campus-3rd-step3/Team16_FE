import { useQuery } from '@tanstack/react-query';
import { fetchGroupPostComments } from '@/api/groupPostCommentsApi';

/**
 * 게시글의 댓글 목록을 조회하는 hook
 */
export const useComments = (postId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['groupPostComments', postId],
    queryFn: () => fetchGroupPostComments(postId),
    enabled,
  });
};
