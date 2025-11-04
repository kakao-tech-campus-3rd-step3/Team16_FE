import { useMutation } from '@tanstack/react-query';
import { createGroupPostApi } from '@/pages/GroupPost/api/createGroupPostApi';
import type { GroupPostFormData } from '@/pages/GroupPost/type';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/stores/authStore';

interface MutationContext {
  previousPosts: any;
}

interface CreatePostParams extends GroupPostFormData {
  imageFiles?: File[];
}

export const useCreateGroupPost = (groupId: number) => {
  const queryClient = useQueryClient();
  const { id: userId, nickname, profileImageUrl } = useAuthStore();

  const mutation = useMutation<void, unknown, CreatePostParams, MutationContext>({
    mutationFn: (data: CreatePostParams) =>
      createGroupPostApi({
        title: data.title,
        content: data.content,
        imageUrls: data.imageUrls,
        groupId: Number(groupId),
      }),
    onMutate: async (newPost: CreatePostParams) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['groupPosts', groupId] });

      // 이전 데이터 백업
      const previousPosts = queryClient.getQueryData(['groupPosts', groupId]);

      // 임시 이미지 URL 생성 (File 객체를 URL로 변환)
      const tempImageUrls = newPost.imageFiles
        ? newPost.imageFiles.map((file) => URL.createObjectURL(file))
        : [];

      // 낙관적 업데이트 - 임시 게시글 추가
      const optimisticPost = {
        postId: 0, // 임시 ID
        authorId: userId,
        authorNickname: nickname,
        authorProfileImageUrl: profileImageUrl,
        title: newPost.title,
        content: newPost.content,
        imageUrls: tempImageUrls, // 임시 이미지 URL 사용
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
        isLike: false,
      };

      queryClient.setQueryData(['groupPosts', groupId], (oldData: any) => {
        if (!oldData) return [optimisticPost];
        return [optimisticPost, ...oldData];
      });

      return { previousPosts };
    },
    onError: (error, _variables, context) => {
      // 에러 시 이전 데이터로 롤백
      if (context?.previousPosts) {
        queryClient.setQueryData(['groupPosts', groupId], context.previousPosts);
      }
      console.error('게시글 작성 실패:', error);
    },
    onSettled: async () => {
      // 성공 시 실제 데이터로 갱신
      await queryClient.invalidateQueries({ queryKey: ['groupPosts', groupId] });
    },
  });

  const { mutateAsync } = mutation;

  return {
    createGroupPost: mutateAsync,
  };
};

export default useCreateGroupPost;
