import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import useAuthStore from '@/stores/authStore';
import { useState, useRef } from 'react';
import studentCard from '@/assets/studentCard.svg';
import { useImageUpload } from '@/hooks/useImageUpload';
import CircularProgress from './components/CircularProgress';

const StudentPage = () => {
  const { verificationStatus } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(studentCard);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadImage, isUploading, uploadProgress } = useImageUpload({
    uploadUrl: '/api/auth/s3-image-url', // 테스트용 URL
    completionUrl: '/api/auth/s3-image-url',
  });

  async function handleSubmit() {
    if (!selectedFile) {
      alert('사진을 선택해주세요.');
      return;
    }

    await uploadImage(selectedFile);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  }

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Wrapper>
      <Description>학생증, 재학증명서, 입학증명서를 아래 예시처럼 제출해주세요.</Description>
      <ImageBox onClick={handleImageBoxClick} disabled={isUploading}>
        <PreviewImage src={previewUrl} alt="" />
        {isUploading && (
          <ProgressOverlay>
            <CircularProgress progress={uploadProgress} size={80} strokeWidth={6} />
          </ProgressOverlay>
        )}
      </ImageBox>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={isUploading}
      />

      <Notice>
        {verificationStatus === 'pending'
          ? '승인 여부 심사 중입니다.'
          : '24시간 내에 관리자가 승인 여부 심사합니다.'}
      </Notice>
      <SubmitButton onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? '업로드 중...' : '증명서류 제출하기'}
      </SubmitButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Description = styled.p`
  width: 90%;
  font-size: 14px;
  color: #666;
  margin-top: 50px;
  text-align: center;
`;

const ImageBox = styled.div<{ disabled: boolean }>`
  width: 90%;
  height: 30vh;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray400};
  font-size: 14px;
  margin-top: 15vh;
  cursor: pointer;
  disable: ${({ disabled }) => (disabled ? 'true' : 'false')};
  position: relative;
`;

const PreviewImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
`;

const Notice = styled.div`
  width: 90%;
  background: #eafbe7;
  color: #3cb371;
  font-size: 13px;
  padding: 15px 0;
  border-radius: 4px;
  margin-bottom: 32px;
  text-align: center;
  margin-top: 10vh;
`;

const SubmitButton = styled.button`
  width: 90%;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  margin-top: 12vh;
`;

const ProgressOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

export default StudentPage;
