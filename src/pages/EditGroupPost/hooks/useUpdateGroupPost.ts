import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGroupPost } from '@/api/groupApi';

const AWS_S3_URL = import.meta.env.VITE_AWS_S3_URL;

interface MutationContext {
  previousPosts: any;
}

interface UpdatePostParams {
  postId: number;
  title: string;
  content: string;
  imageUrls?: string[];
  imageFiles?: File[];
}

export const useUpdateGroupPost = (groupId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, UpdatePostParams, MutationContext>({
    mutationFn: (data: UpdatePostParams) => {
      // 기존 이미지 URL에서 AWS_S3_URL 제거
      const cleanedImageUrls = data.imageUrls
        ? data.imageUrls.map((url) => url.replace(AWS_S3_URL, ''))
        : undefined;

      return updateGroupPost(data.postId, {
        title: data.title,
        content: data.content,
        imageUrls: cleanedImageUrls,
      });
    },
    onMutate: async (updatedPost: UpdatePostParams) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['groupPosts', groupId] });

      // 기존 이미지 URL 처리: AWS_S3_URL이 없으면 앞에 붙이기
      const existingImageUrls = updatedPost.imageUrls
        ? updatedPost.imageUrls.map((url) => {
            // AWS_S3_URL이 이미 포함되어 있으면 그대로 반환
            if (url.startsWith(AWS_S3_URL)) {
              return url;
            }
            // AWS_S3_URL이 없으면 앞에 붙이기
            return `${AWS_S3_URL}${url}`;
          })
        : [];

      // 이전 데이터 백업
      const previousPosts = queryClient.getQueryData(['groupPosts', groupId]);

      queryClient.setQueryData(['groupPosts', groupId], (oldData: any) => {
        if (!oldData) return oldData;

        return oldData.map((post: any) => {
          if (post.postId === updatedPost.postId) {
            return {
              ...post,
              postId: 0, //임시아이디
              title: updatedPost.title,
              content: updatedPost.content,
              imageUrls: existingImageUrls,
              updatedAt: new Date().toISOString(),
            };
          }
          return post;
        });
      });

      return { previousPosts };
    },
    onError: (error, _variables, context) => {
      // 에러 시 이전 데이터로 롤백
      if (context?.previousPosts) {
        queryClient.setQueryData(['groupPosts', groupId], context.previousPosts);
      }
      console.error('게시글 수정 실패:', error);
    },
    onSettled: async (_data, _error, variables) => {
      // 성공 시 실제 데이터로 갱신
      await queryClient.invalidateQueries({ queryKey: ['groupPosts', groupId] });
      await queryClient.invalidateQueries({ queryKey: ['groupPost', Number(variables.postId)] });
    },
  });

  const { mutateAsync, isPending: isUpdating } = mutation;

  return {
    updatePost: mutateAsync,
    isUpdating,
  };
};

export default useUpdateGroupPost;
