import styled from '@emotion/styled';
import { IoCamera } from 'react-icons/io5';
import BottomSheet from '@/components/common/BottomSheet';
import { useState, useRef } from 'react';
import defaultUserImg from '@/assets/defaultUserImg.svg';
import CustomAlert from '@/components/common/CustomAlert';
import { useAlert } from '@/hooks/useAlert';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface ImgSectionProps {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  profileImgUrl: string | null;
  setImageChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImgSection = ({ setSelectedFile, profileImgUrl, setImageChanged }: ImgSectionProps) => {
  const { isOpen: isAlertOpen, alertOptions, showAlert, closeAlert } = useAlert();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profileImgUrl || defaultUserImg);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showAlert({ message: '파일 크기는 5MB를 초과할 수 없습니다.', type: 'error' });
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    console.log(previewUrl);
    setSelectedFile(file);
    setImageChanged(true); // 이미지가 변경됨을 표시
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <Img src={previewUrl ?? defaultUserImg} onClick={() => setIsOpen(true)} />
      <Camera />
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={[
          {
            label: '앨범에서 선택',
            onClick: handleOptionClick,
          },
          {
            label: '프로필 사진 삭제',
            onClick: () => {
              setSelectedFile(null);
              setPreviewUrl(null);
              setImageChanged(true); // 이미지가 삭제됨을 표시
            },
            variant: 'danger',
          },
        ]}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <CustomAlert
        isOpen={isAlertOpen}
        onClose={closeAlert}
        message={alertOptions.message}
        type={alertOptions.type}
        confirmText={alertOptions.confirmText}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: '100px',
  height: '100px',
  position: 'relative',
});

const Img = styled.img({
  borderRadius: '50%',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Camera = styled(IoCamera)({
  borderRadius: '50%',
  width: '25px',
  height: '25px',
  position: 'absolute',
  bottom: '0',
  right: '0',
  backgroundColor: 'gray',
  padding: '2px',
});

export default ImgSection;
