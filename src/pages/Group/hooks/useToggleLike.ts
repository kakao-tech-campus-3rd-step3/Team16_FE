import { likeGroupPost, unlikeGroupPost } from '@/api/groupPostLike';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const useToggleLike = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, isLike }: { postId: number; isLike: boolean }) =>
      isLike ? unlikeGroupPost(postId) : likeGroupPost(postId),
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ['groupPosts', groupId] });
      const previousPosts = queryClient.getQueryData<any[]>(['groupPosts', groupId]);
      // 낙관적으로 isLike 반전, likeCount 증감

      if (previousPosts) {
        const updatedPosts = previousPosts.map((post: any) =>
          post.postId === postId // mutate 함수에서 넘어온 postId
            ? {
                ...post,
                isLike: !post.isLike, // isLike 상태를 반전
                likeCount: post.isLike ? post.likeCount - 1 : post.likeCount + 1, // 상태에 따라 증감
              }
            : post
        );
        // setQueryData를 사용해 캐시를 새로운 배열로 덮어쓰기
        queryClient.setQueryData(['groupPosts', groupId], updatedPosts);
      }
      return { previousPosts };
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(['groupPosts', groupId], context?.previousPosts);
    },
  });
};
