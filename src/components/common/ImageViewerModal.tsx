import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  altText: string;
}

const ImageViewerModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  altText,
}: ImageViewerModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <ImageContainer>
        <FullImage
          src={images[currentIndex]}
          alt={`${altText} - ${currentIndex + 1}`}
          onClick={(e) => e.stopPropagation()}
        />
        {images.length > 1 && (
          <ImageCounter>
            {currentIndex + 1} / {images.length}
          </ImageCounter>
        )}
      </ImageContainer>
    </Overlay>
  );
};

export default ImageViewerModal;

const Overlay = styled.div({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
});

const CloseButton = styled.button({
  position: 'absolute',
  top: '20px',
  right: '20px',
  background: 'none',
  border: 'none',
  color: colors.white,
  fontSize: '36px',
  cursor: 'pointer',
  zIndex: 2001,
  padding: '10px',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const ImageContainer = styled.div({
  position: 'relative',
  maxWidth: '90vw',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const FullImage = styled.img({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  borderRadius: '8px',
});

const ImageCounter = styled.div({
  position: 'absolute',
  bottom: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: colors.white,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '14px',
});
