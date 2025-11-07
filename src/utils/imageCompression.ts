/**
 * 이미지 파일을 압축합니다.
 * @param file - 압축할 이미지 파일
 * @param options - 압축 옵션
 * @returns 압축된 이미지 파일
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.8, maxSizeMB = 1 } = options;

  // 이미지가 아닌 경우 원본 반환
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // 파일 크기가 이미 작으면 원본 반환
  if (file.size <= maxSizeMB * 1024 * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Canvas 생성
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context를 가져올 수 없습니다.'));
          return;
        }

        // 비율을 유지하면서 크기 조정
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // 이미지 그리기
        ctx.drawImage(img, 0, 0, width, height);

        // Blob으로 변환
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('이미지 압축에 실패했습니다.'));
              return;
            }

            // File 객체 생성
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            // 압축 후에도 용량이 크면 품질을 더 낮춰서 재시도
            if (compressedFile.size > maxSizeMB * 1024 * 1024 && quality > 0.5) {
              compressImage(file, { ...options, quality: quality - 0.1 })
                .then(resolve)
                .catch(reject);
            } else {
              resolve(compressedFile);
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('이미지 로드에 실패했습니다.'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('파일 읽기에 실패했습니다.'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * 여러 이미지 파일을 압축합니다.
 * @param files - 압축할 이미지 파일 배열
 * @param options - 압축 옵션
 * @returns 압축된 이미지 파일 배열
 */
export const compressImages = async (
  files: File[],
  options: CompressionOptions = {}
): Promise<File[]> => {
  return Promise.all(files.map((file) => compressImage(file, options)));
};

export interface CompressionOptions {
  /** 최대 너비 (기본값: 1920px) */
  maxWidth?: number;
  /** 최대 높이 (기본값: 1920px) */
  maxHeight?: number;
  /** 이미지 품질 0~1 (기본값: 0.8) */
  quality?: number;
  /** 최대 파일 크기 MB (기본값: 1MB) */
  maxSizeMB?: number;
}
