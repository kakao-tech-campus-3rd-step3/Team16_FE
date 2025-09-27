import { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import type { ImagePickerProps } from '../type';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImagePicker = ({ maxCount = 5, setImageFiles, imageFiles }: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(
    imageFiles.map((file) => URL.createObjectURL(file))
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // 파일 크기 검사(개별) 및 남은 선택 가능 개수 계산
    const remaining = Math.max(0, maxCount - imageUrls.length);
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
    if (imageUrls.length >= maxCount) {
      alert(`최대 ${maxCount}장의 사진만 선택할 수 있습니다.`);
      return;
    }
    inputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    // revoke object URL to free memory
    const url = imageUrls[index];
    URL.revokeObjectURL(url);
    const next = imageUrls.filter((_, i) => i !== index);
    const nextFiles = imageFiles.filter((_, i) => i !== index);

    setImageFiles(nextFiles);
    setImageUrls(next);
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
      <CountText>
        선택된 사진: {imageUrls.length} / {maxCount}
      </CountText>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <PickButton type="button" onClick={handlePickClick} disabled={imageUrls.length >= maxCount}>
        사진 선택
      </PickButton>
      <Preview>
        {imageUrls.map((src, idx) => (
          <Thumb key={idx}>
            <Img src={src} alt={`selected-${idx}`} />
            <RemoveButton type="button" onClick={() => handleRemove(idx)}>
              삭제
            </RemoveButton>
          </Thumb>
        ))}
      </Preview>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
});

const PickButton = styled.button({
  background: colors.primary,
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: 8,
  cursor: 'pointer',
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

export default ImagePicker;
