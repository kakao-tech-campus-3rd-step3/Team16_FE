import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroupPostComment } from '@/api/groupPostCommentsApi';

/**
 * 댓글 삭제 mutation hook (낙관적 업데이트 포함)
 */
export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteGroupPostComment(commentId),
    onMutate: (commentId: number) => {
      // 삭제 낙관적 업데이트
      queryClient.setQueryData(['groupPostComments', postId], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.filter((comment: any) => comment.commentId !== commentId);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupPostComments', postId] });
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
      // 에러 시 데이터 재조회
      queryClient.invalidateQueries({ queryKey: ['groupPostComments', postId] });
    },
  });
};
