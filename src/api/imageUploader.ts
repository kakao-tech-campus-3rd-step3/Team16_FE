import axios from 'axios';

interface UploadApiOptions {
  uploadUrl: string;
  completionUrl?: string;
}

interface PresignedUrlResponse {
  presignedUrl: string;
}

export const uploadImageApi = async (file: File, options: UploadApiOptions): Promise<string> => {
  const { uploadUrl, completionUrl } = options;

  // 1. Presigned URL 요청
  const {
    data: { presignedUrl },
  } = await axios.post<PresignedUrlResponse>(uploadUrl, {
    imageFileName: file.name,
    imageFileType: file.type,
  });

  // 2. S3로 업로드
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
  });

  const imageUrl = presignedUrl.split('?')[0];

  // 3. 업로드 완료 알림
  if (completionUrl) {
    await axios.post(completionUrl, { imageUrl });
  }

  // 4. 최종 URL 반환
  return imageUrl;
};
