import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentCard from '@/assets/studentCard.svg';
import { useImageUpload } from '@/hooks/useImageUpload';
import CircularProgress from './components/CircularProgress';
import { IoCamera } from 'react-icons/io5';
import useAuthStore from '@/stores/authStore';
import useUserInfo from '@/hooks/useUserInfo';

const StudentPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(studentCard);
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null);
  const { studentVerifiedStatus, setVerificationStatus } = useAuthStore();
  const { refetch } = useUserInfo();

  const { uploadImagesAsync, isUploading, uploadProgress } = useImageUpload({
    type: 'VERIFICATION',
    completionUrl: '/auth/student-verification',
    request_url: '/image/presigned',
  });

  // 주기적으로 userInfo를 refetch하여 studentVerifiedStatus 업데이트
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await refetch();
        if (result.data?.studentVerifiedStatus) {
          setVerificationStatus(result.data.studentVerifiedStatus);

          // VERIFIED 상태가 되면 루트 경로로 이동
          if (result.data.studentVerifiedStatus === 'VERIFIED') {
            clearInterval(interval);
            navigate('/');
          }
        }
      } catch (error) {
        console.error('사용자 정보 업데이트 실패:', error);
      }
    }, 3000); // 3초마다 체크

    // 컴포넌트 언마운트 시 인터벌 클리어
    return () => clearInterval(interval);
  }, [refetch, setVerificationStatus, navigate]);

  async function handleSubmit() {
    if (!selectedFile) {
      alert('사진을 선택해주세요.');
      return;
    }

    try {
      await uploadImagesAsync(selectedFile);
      // 업로드 완료 후 사용자 정보 갱신
      await refetch();
      alert('인증서류가 성공적으로 제출되었습니다!');
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다. 다시 시도해주세요.');
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile([file]);
  }

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  const skipVerification = () => {
    setVerificationStatus('VERIFIED');
    alert('학생 인증을 건너뛰었습니다.');
    console.log(studentVerifiedStatus);
    navigate('/');
  };

  return (
    <Wrapper>
      <Description>학생증, 재학증명서, 입학증명서를 아래 예시처럼 제출해주세요.</Description>
      <ImageBox onClick={handleImageBoxClick} disabled={isUploading}>
        {!selectedFile && !isUploading && (
          <UploadGuide>
            <IoCamera size={32} />
            <span>클릭하여 사진 업로드</span>
          </UploadGuide>
        )}
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
        {studentVerifiedStatus === 'PENDING'
          ? '승인 여부 심사 중입니다.'
          : '24시간 내에 관리자가 승인 여부 심사합니다.'}
      </Notice>
      <SubmitButton onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? '업로드 중...' : '증명서류 제출하기'}
      </SubmitButton>
      <SkipButton onClick={skipVerification}>테스트를 위한 인증 건너뛰기</SkipButton>
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  position: relative;
`;

const UploadGuide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bbb;
  font-size: 16px;
  gap: 8px;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
`;

const PreviewImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
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

const SkipButton = styled.button`
  width: 90%;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  margin-top: 1vh;
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

export default StudentPage;
