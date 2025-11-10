import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroupPostComment } from '@/api/groupPostCommentsApi';

/**
 * 댓글 삭제 mutation hook (낙관적 업데이트 포함)
 */
export const useDeleteComment = (postId: number, groupId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteGroupPostComment(commentId),
    onMutate: async (commentId: number) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['groupPostComments', postId] });
      if (groupId !== undefined) {
        await queryClient.cancelQueries({ queryKey: ['groupPosts', groupId] });
      }
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      // 이전 데이터 백업
      const previousComments = queryClient.getQueryData(['groupPostComments', postId]);
      const previousPosts =
        groupId !== undefined ? queryClient.getQueryData(['groupPosts', groupId]) : undefined;
      const previousFeed = queryClient.getQueryData(['feed']);

      // 낙관적 업데이트 - 댓글 삭제
      queryClient.setQueryData(['groupPostComments', postId], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.filter((comment: any) => comment.commentId !== commentId);
      });

      // 낙관적 업데이트 - groupPosts의 commentCount 감소
      if (groupId !== undefined) {
        queryClient.setQueryData(['groupPosts', groupId], (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((post: any) =>
            post.postId === postId
              ? { ...post, commentCount: Math.max(0, post.commentCount - 1) }
              : post
          );
        });
      }

      // 낙관적 업데이트 - feed의 commentCount 감소
      queryClient.setQueryData(['feed'], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((post: any) =>
          post.postId === postId
            ? { ...post, commentCount: Math.max(0, post.commentCount - 1) }
            : post
        );
      });

      return { previousComments, previousPosts, previousFeed };
    },
    onError: (error, _commentId, context) => {
      console.error('댓글 삭제 실패:', error);

      // 에러 시 이전 데이터로 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(['groupPostComments', postId], context.previousComments);
      }
      if (context?.previousPosts && groupId !== undefined) {
        queryClient.setQueryData(['groupPosts', groupId], context.previousPosts);
      }
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSuccess: () => {
      // 성공 시 실제 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: ['groupPostComments', postId] });
      if (groupId !== undefined) {
        queryClient.invalidateQueries({ queryKey: ['groupPosts', groupId] });
      }
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};
