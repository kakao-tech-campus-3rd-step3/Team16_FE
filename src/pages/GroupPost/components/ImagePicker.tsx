import { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import type { ImagePickerProps } from '../type';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImagePicker = ({
  maxCount = 5,
  setImageFiles,
  imageFiles,
  existingImages = [],
  setExistingImages,
}: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(
    imageFiles.map((file) => URL.createObjectURL(file))
  );

  // 총 이미지 개수 = 기존 이미지 + 새로운 이미지
  const totalImageCount = existingImages.length + imageUrls.length;
  // 남은 선택 가능 장수
  const remaining = Math.max(0, maxCount - totalImageCount);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // 파일 크기 검사(개별)
    const validFiles = files
      .filter((f) => {
        if (f.size > MAX_FILE_SIZE) {
          alert(`${f.name} 은(는) 5MB를 초과하여 제외됩니다.`);
          return false;
        }
        return true;
      })
      .slice(0, remaining);

    if (validFiles.length === 0) return;

    if (files.length > remaining) {
      alert(`최대 ${maxCount}장까지 선택할 수 있습니다. 먼저 ${remaining}장만 추가됩니다.`);
    }

    const newUrls = validFiles.map((file) => URL.createObjectURL(file));

    // 기존 images 배열에 붙이기 (파일과 URL 모두)
    const nextUrls = imageUrls.concat(newUrls);
    const nextFiles = imageFiles.concat(validFiles);

    setImageFiles(nextFiles);
    setImageUrls(nextUrls);
  };

  const handlePickClick = () => {
    if (totalImageCount >= maxCount) {
      alert(`최대 ${maxCount}장의 사진만 선택할 수 있습니다.`);
      return;
    }
    inputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const url = imageUrls[index];
    URL.revokeObjectURL(url);
    const next = imageUrls.filter((_, i) => i !== index);
    const nextFiles = imageFiles.filter((_, i) => i !== index);

    setImageFiles(nextFiles);
    setImageUrls(next);
  };

  const handleRemoveExisting = (index: number) => {
    if (setExistingImages) {
      const next = existingImages.filter((_, i) => i !== index);
      setExistingImages(next);
    }
  };

  // 언마운트 시 삭제
  useEffect(() => {
    return () => {
      imageUrls.forEach((u) => {
        URL.revokeObjectURL(u);
      });
    };
  }, []);

  return (
    <Wrapper>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Preview>
        {/* 기존 이미지 먼저 표시 */}
        {existingImages.map((src, idx) => (
          <Thumb key={`existing-${idx}`}>
            <Img src={src} alt={`existing-${idx}`} />
            <RemoveButton type="button" onClick={() => handleRemoveExisting(idx)}>
              ✕
            </RemoveButton>
          </Thumb>
        ))}

        {/* 새로 선택한 이미지 표시 */}
        {imageUrls.map((src, idx) => (
          <Thumb key={`new-${idx}`}>
            <Img src={src} alt={`selected-${idx}`} />
            <RemoveButton type="button" onClick={() => handleRemove(idx)}>
              ✕
            </RemoveButton>
          </Thumb>
        ))}

        {totalImageCount < maxCount && (
          <UploadBox onClick={() => handlePickClick()}>
            <PlusIcon>＋</PlusIcon>
          </UploadBox>
        )}
      </Preview>
      <CountText>
        {maxCount - remaining}/{maxCount}
      </CountText>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
});

const CountText = styled.div({
  ...{
    fontSize: 14,
    color: colors.gray600,
  },
});

const Preview = styled.div({
  display: 'flex',
  gap: spacing.spacing2,
  flexWrap: 'wrap',
});

const Thumb = styled.div({
  position: 'relative',
  width: 96,
  height: 96,
  borderRadius: 8,
  overflow: 'hidden',
  background: colors.gray100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Img = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const RemoveButton = styled.button({
  position: 'absolute',
  bottom: 4,
  right: 4,
  background: 'rgba(0,0,0,0.6)',
  color: 'white',
  border: 'none',
  padding: '4px 6px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 12,
});

const UploadBox = styled.div({
  width: 96,
  height: 96,
  borderRadius: 8,
  border: `2px dashed ${colors.gray400}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.gray500,
  fontSize: 24,
  cursor: 'pointer',
});

const PlusIcon = styled.span({});

export default ImagePicker;
