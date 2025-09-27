import { useMutation } from '@tanstack/react-query';
import { createGroupPostApi } from '@/pages/GroupPost/api/createGroupPostApi';
import type { GroupPostFormData } from '@/pages/GroupPost/type';

export const useCreateGroupPost = (groupId: number) => {
  const mutation = useMutation<void, unknown, GroupPostFormData>({
    mutationFn: (data: GroupPostFormData) =>
      createGroupPostApi({
        ...data,
        groupId: Number(groupId),
      }),
  });

  const { mutateAsync } = mutation;

  return {
    createGroupPost: mutateAsync,
    isPosting: mutation.isPending,
  };
};

export default useCreateGroupPost;
