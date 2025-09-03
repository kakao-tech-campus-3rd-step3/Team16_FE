import { useMutation } from '@tanstack/react-query';
import { uploadImageApi } from '@/api/imageUploader';

interface UseImageUploadOptions {
  uploadUrl: string; // 이미지 업로드용 URL
  completionUrl: string; // 이미지 제출 완료 알림용 URL
}

export const useImageUpload = (options: UseImageUploadOptions) => {
  const { uploadUrl, completionUrl } = options;

  const { mutate, isPending } = useMutation<string, Error, File>({
    mutationFn: (file: File) =>
      uploadImageApi(file, {
        uploadUrl,
        completionUrl,
      }),

    onSuccess: () => {
      alert('제출이 완료되었습니다!');
    },

    onError: () => {
      alert('제출 중 오류가 발생했습니다.');
    },
  });

  return {
    uploadImage: mutate,
    isUploading: isPending,
  };
};
