import { useMutation } from '@tanstack/react-query';
import { uploadImageApi } from '@/api/imageUploader';
import { useState } from 'react';
import { useMemo } from 'react';
import { compressImages } from '@/utils/imageCompression';
import type { CompressionOptions } from '@/utils/imageCompression';

export const useImageUpload = (options: UseImageUploadOptions) => {
  const { type, completionUrl, request_url, compressionOptions } = options;

  // 각 파일의 진행률을 { fileIndex: progress } 형태로 저장
  const [progresses, setProgresses] = useState<Record<number, number>>({});
  // 총 파일 개수 저장
  const [totalFiles, setTotalFiles] = useState(0);

  const { mutate, mutateAsync, isPending } = useMutation<string[], Error, File[]>({
    // mutationFn이 단일 File 대신 File[] 배열을 받음
    mutationFn: async (files: File[]) => {
      // 업로드 시작 시 진행률 상태 초기화
      setProgresses({});
      setTotalFiles(files.length);

      // 이미지 압축 (기본값 또는 사용자 지정 옵션 사용)
      const compressedFiles = await compressImages(files, compressionOptions);

      // 각 파일을 업로드하는 Promise 배열 생성
      const uploadPromises = compressedFiles.map((file, index) =>
        uploadImageApi(file, {
          type,
          completionUrl,
          // onProgress 콜백에서 파일의 index를 사용해 개별 진행률 업데이트
          onProgress: (progress) => {
            setProgresses((prev) => ({
              ...prev,
              [index]: progress, // e.g., { 0: 50, 1: 25 }
            }));
          },
          request_url,
        })
      );

      // Promise.all로 모든 업로드를 병렬 실행
      return Promise.all(uploadPromises);
    },

    onError: (error) => {
      handleUploadError(error);
    },
    // 성공/실패 여부와 관계없이 마지막에 상태 초기화
    onSettled: () => {
      setProgresses({});
      setTotalFiles(0);
    },
  });

  // 전체 진행률 계산
  const totalProgress = useMemo(() => {
    if (totalFiles === 0) return 0;

    // progresses 객체의 모든 값(각 파일의 진행률)을 더함
    const sumOfProgress = Object.values(progresses).reduce((acc, curr) => acc + curr, 0);

    // 합계를 총 파일 개수로 나누어 평균 진행률 계산
    return Math.round(sumOfProgress / totalFiles);
  }, [progresses, totalFiles]);

  return {
    uploadImages: mutate, // 기존 이름(콜백형)
    uploadImagesAsync: mutateAsync, // await 가능한 형태
    isUploading: isPending,
    uploadProgress: totalProgress, // 전체 진행률 반환
  };
};

function handleUploadError(error: any) {
  // 네트워크 연결 자체가 실패한 경우
  if (!error.response || error.response?.status === 0) {
    console.error('네트워크 연결 오류:', error);
    return;
  }

  // 서버가 응답은 주지만 실패한 경우
  console.error('업로드 실패:', error);
}

interface UseImageUploadOptions {
  type: string;
  completionUrl?: string;
  request_url: string;
  /** 이미지 압축 옵션 (선택사항) */
  compressionOptions?: CompressionOptions;
}
