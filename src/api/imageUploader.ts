import axios from 'axios';
import { apiClient } from '@/api/apiClient';

export const uploadImageApi = async (file: File, options: UploadApiOptions) => {
  const { type, completionUrl, onProgress } = options;

  // 1. Presigned URL 요청
  const {
    data: { url: presignedUrl, fileName },
  } = await apiClient.post<PresignedUrlResponse>('/image/presigned', {
    fileExtension: file.name.split('.').pop()?.toUpperCase(),
    type: type,
  });

  // 2. S3로 업로드
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  // 3. 업로드 완료 알림
  if (completionUrl) {
    await apiClient.put(completionUrl, { fileName, type });
  }

  const imageUrl = presignedUrl.split('?')[0];
  return imageUrl;
};

interface UploadApiOptions {
  type: string;
  completionUrl?: string;
  onProgress?: (progress: number) => void;
}

interface PresignedUrlResponse {
  url: string;
  fileName: string;
}
