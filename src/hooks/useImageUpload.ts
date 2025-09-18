import { useMutation } from '@tanstack/react-query';
import { uploadImageApi } from '@/api/imageUploader';
import { useState } from 'react';

interface UseImageUploadOptions {
  type: string;
  completionUrl: string;
}

function handleUploadError(error: any) {
  // 네트워크 연결 자체가 실패한 경우
  if (!error.response || error.response?.status === 0) {
    alert('네트워크 연결을 확인해주세요.');
    return;
  }

  // 서버가 응답은 주지만 실패한 경우
  alert('업로드에 실패했습니다. 다시 시도해주세요.');
}

export const useImageUpload = (options: UseImageUploadOptions) => {
  const { type, completionUrl } = options;
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { mutate, isPending } = useMutation<void, Error, File>({
    mutationFn: (file: File) =>
      uploadImageApi(file, {
        type,
        completionUrl,
        onProgress: (progress) => setUploadProgress(progress),
      }),

    onSuccess: () => {
      alert('제출이 완료되었습니다!');
      setUploadProgress(0);
    },

    onError: (error) => {
      handleUploadError(error);
      setUploadProgress(0);
    },
  });

  return {
    uploadImage: mutate,
    isUploading: isPending,
    uploadProgress,
  };
};
