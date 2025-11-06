import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postGroupPostComment } from '@/api/groupPostCommentsApi';

interface CreateCommentOptions {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

/**
 * 댓글 작성 mutation hook (낙관적 업데이트 포함)
 */
export const useCreateComment = (
  postId: number,
  groupId: number,
  options: CreateCommentOptions
) => {
  const queryClient = useQueryClient();
  const { userId, nickname, profileImageUrl } = options;

  return useMutation({
    mutationFn: (content: string) => postGroupPostComment(postId, content),
    onMutate: async (content: string) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['groupPostComments', postId] });
      await queryClient.cancelQueries({ queryKey: ['groupPosts', groupId] });

      // 이전 데이터 백업
      const previousComments = queryClient.getQueryData(['groupPostComments', postId]);
      const previousPosts = queryClient.getQueryData(['groupPosts', groupId]);

      // 낙관적 업데이트 - 댓글 추가
      const newComment = {
        commentId: 0, // 임시 ID
        commentUserId: userId,
        userNickname: nickname,
        userProfileImageUrl: profileImageUrl,
        content: content,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(['groupPostComments', postId], (oldData: any) => {
        if (!oldData) return [newComment];
        return [...oldData, newComment];
      });

      // 낙관적 업데이트 - commentCount 증가
      queryClient.setQueryData(['groupPosts', groupId], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((post: any) =>
          post.postId === postId ? { ...post, commentCount: post.commentCount + 1 } : post
        );
      });

      return { previousComments, previousPosts };
    },
    onError: (error, _content, context) => {
      // 에러 시 이전 데이터로 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(['groupPostComments', postId], context.previousComments);
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(['groupPosts', groupId], context.previousPosts);
      }
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      // 성공 시 실제 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: ['groupPostComments', postId] });
      queryClient.invalidateQueries({ queryKey: ['groupPosts', groupId] });
    },
  });
};
