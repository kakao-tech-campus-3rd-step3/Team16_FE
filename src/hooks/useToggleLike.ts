import { likeGroupPost, unlikeGroupPost } from '@/api/groupPostLike';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const useToggleLike = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, isLike }: { postId: number; isLike: boolean }) =>
      isLike ? unlikeGroupPost(postId) : likeGroupPost(postId),
    onMutate: async ({ postId }) => {
      // 진행 중인 쿼리들 취소
      await queryClient.cancelQueries({ queryKey: ['groupPosts', groupId] });
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      // 이전 데이터 백업
      const previousPosts = queryClient.getQueryData<any[]>(['groupPosts', groupId]);
      const previousFeed = queryClient.getQueryData<any[]>(['feed']);

      // groupPosts 쿼리에 대한 낙관적 업데이트
      if (previousPosts) {
        const updatedPosts = previousPosts.map((post: any) =>
          post.postId === postId
            ? {
                ...post,
                isLike: !post.isLike,
                likeCount: post.isLike ? post.likeCount - 1 : post.likeCount + 1,
              }
            : post
        );
        queryClient.setQueryData(['groupPosts', groupId], updatedPosts);
      }

      // feed 쿼리에 대한 낙관적 업데이트
      if (previousFeed) {
        const updatedFeed = previousFeed.map((post: any) =>
          post.postId === postId
            ? {
                ...post,
                isLike: !post.isLike,
                likeCount: post.isLike ? post.likeCount - 1 : post.likeCount + 1,
              }
            : post
        );
        queryClient.setQueryData(['feed'], updatedFeed);
      }

      return { previousPosts, previousFeed };
    },
    onError: (_err, _, context) => {
      // 에러 시 이전 데이터로 롤백
      if (context?.previousPosts) {
        queryClient.setQueryData(['groupPosts', groupId], context.previousPosts);
      }
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSettled: () => {
      // 성공/실패와 관계없이 최종적으로 데이터 재조회
      queryClient.invalidateQueries({ queryKey: ['groupPosts', groupId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};
