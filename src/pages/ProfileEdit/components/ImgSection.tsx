import styled from '@emotion/styled';
import { IoCamera } from 'react-icons/io5';
import BaseModal from '@/components/common/BaseModal';
import { useState, useRef } from 'react';
import { colors } from '@/styles/colors';
import defaultUserImg from '@/assets/defaultUserImg.svg';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface ImgSectionProps {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  profileImgUrl: string | null;
}

const ImgSection = ({ setSelectedFile, profileImgUrl }: ImgSectionProps) => {
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
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    console.log(previewUrl);
    setSelectedFile(file);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <Img src={previewUrl ?? defaultUserImg} onClick={() => setIsOpen(true)} />
      <Camera />
      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="bottom">
        <OptionList>
          <OptionItem onClick={handleOptionClick}>앨범에서 선택</OptionItem>
          <OptionItem
            onClick={() => {
              setSelectedFile(null);
              setPreviewUrl(null);
            }}
          >
            프로필 사진 삭제
          </OptionItem>
        </OptionList>
        <OptionList>
          <OptionItem onClick={() => setIsOpen(false)}>닫기</OptionItem>
        </OptionList>
      </BaseModal>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
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

const OptionList = styled.div({
  margin: '0 16px',
  borderRadius: '12px',
  overflow: 'hidden',
  background: colors.gray300,
  marginBottom: '5px',
});

const OptionItem = styled.div({
  padding: '15px',
  textAlign: 'center',
  borderBottom: `1px solid ${colors.gray100}`,
});

export default ImgSection;
