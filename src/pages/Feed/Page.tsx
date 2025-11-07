import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { fetchFeedPosts } from '@/api/feedApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CommentModal from '@/components/common/CommentModal';
import { format } from 'date-fns';
import { useToggleLike } from '@/hooks/useToggleLike';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import ImageViewerModal from '@/components/common/ImageViewerModal';
import UserPageModal from '@/components/common/UserPageModal';
import BottomNavigation from '@/components/common/BottomNavigation';
import { FaChevronRight } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

interface Post {
  postId: number;
  groupId: number;
  authorNickname: string;
  title: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLike: boolean;
}

interface ImageCarouselProps {
  images: string[];
  altText: string;
}

const ImageCarousel = ({ images, altText }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // 이미지 뷰어 열릴 때 스크롤 막기
  //useScrollLock(isViewerOpen);

  const handleImageClick = () => {
    if (!isDragging) {
      setIsViewerOpen(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !isDragging) return;

    const touch = e.touches[0];
    const diff = touchStart - touch.clientX;
    setDragOffset(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const touchEnd = touch.clientX;
    const diff = touchStart - touchEnd;

    // 최소 50px 이상 스와이프해야 넘어감
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < images.length - 1) {
        // 왼쪽으로 스와이프 - 다음 이미지
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // 오른쪽으로 스와이프 - 이전 이미지
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setTouchStart(null);
    setIsDragging(false);
    setDragOffset(0);
  };

  if (images.length === 0) return null;

  const translateX =
    -currentIndex * 100 + (isDragging ? -(dragOffset / window.innerWidth) * 100 : 0);

  return (
    <ImageContainer>
      <ImageSlider
        style={{ transform: `translateX(${translateX}%)` }}
        isDragging={isDragging}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <ImageSlide key={index}>
            <PostImage
              src={image}
              alt={`${altText} - ${index + 1}`}
              draggable={false}
              onClick={handleImageClick}
            />
          </ImageSlide>
        ))}
      </ImageSlider>

      {images.length > 1 && (
        <ProgressBarContainer>
          {images.map((_, index) => (
            <ProgressDot
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </ProgressBarContainer>
      )}

      <ImageViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        currentIndex={currentIndex}
        altText={altText}
      />
    </ImageContainer>
  );
};

const Feed = () => {
  const { groupId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: () => fetchFeedPosts(),
  });
  const { mutate: toggleLike } = useToggleLike(Number(groupId));

  const posts = data || [];

  if (isPending) {
    return (
      <>
        <LoadingSpinner />
        <BottomNavigation />
      </>
    );
  }
  return (
    <Wrapper>
      {posts.map((post: Post) => {
        const date = new Date(post.createdAt);
        const formattedDate = isNaN(date.getTime())
          ? '날짜 없음'
          : format(date, 'yyyy.MM.dd HH:mm');

        return (
          <PostContent key={post.postId}>
            <Header>
              <TitleWrapper>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{formattedDate}</PostDate>
              </TitleWrapper>
              <GroupButton onClick={() => navigate(`/group/${post.groupId}`)}>
                <FaUserGroup size={16} />
                <FaChevronRight size={16} />
              </GroupButton>
            </Header>
            {post.imageUrls.length > 0 && (
              <ImageCarousel images={post.imageUrls} altText={post.title} />
            )}
            {post.content && <PostDescription>{post.content}</PostDescription>}
            <PostActions>
              <ActionButton
                onClick={() => {
                  console.log('post.postId', post.postId);
                  toggleLike({ postId: post.postId, isLike: post.isLike });
                }}
              >
                {post.isLike ? <FaThumbsUp color={colors.primary} /> : <FaRegThumbsUp />}
                <span>좋아요 {post.likeCount}</span>
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setIsOpen(true);
                  setPostId(post.postId);
                  setSelectedGroupId(post.groupId);
                }}
              >
                <FaRegComment />
                <span>댓글 {post.commentCount}</span>
              </ActionButton>
            </PostActions>
          </PostContent>
        );
      })}

      <CommentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postId={postId}
        groupId={selectedGroupId}
        onUserClick={(userId) => {
          setSelectedUserId(userId);
          setIsUserModalOpen(true);
        }}
      />
      <UserPageModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        userId={selectedUserId}
      />

      <BottomNavigation />
      <Spacer />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  backgroundColor: colors.gray100,
  display: 'flex',
  flexDirection: 'column',
});

const Spacer = styled.div({
  height: '60px',
});

const Header = styled.div({
  padding: spacing.spacing2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TitleWrapper = styled.div({
  flex: 1,
});

const ImageContainer = styled.div({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
});

const ImageSlider = styled.div<{ isDragging: boolean }>(({ isDragging }) => ({
  display: 'flex',
  transition: isDragging ? 'none' : 'transform 0.3s ease',
  width: '100%',
}));

const ImageSlide = styled.div({
  flex: '0 0 100%',
});

const PostImage = styled.img({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  display: 'block',
  cursor: 'pointer',
});

const ProgressBarContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 0',
  backgroundColor: colors.white,
});

const ProgressDot = styled.div<{ active: boolean }>(({ active }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: active ? colors.primary : colors.gray300,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
}));

const PostContent = styled.div({
  marginBottom: spacing.spacing2,
  backgroundColor: colors.white,
  alignItems: 'center',
});

const PostTitle = styled.h3({
  ...typography.h2,
});

const PostDate = styled.p({
  ...typography.small,
  color: colors.gray600,
});

const PostDescription = styled.p({
  ...typography.body,
  padding: spacing.spacing2,
});

const PostActions = styled.div({
  display: 'flex',
  width: '100%',
});

const ActionButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  background: 'none',
  border: 'none',
  color: colors.gray600,
  ...typography.small,
  cursor: 'pointer',
  padding: spacing.spacing3,
  flex: 1,
});

const GroupButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: `${spacing.spacing1}px ${spacing.spacing2}px`,
  backgroundColor: colors.primary,
  color: colors.white,
  border: 'none',
  borderRadius: '20px',
  ...typography.small,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': {
    opacity: 0.9,
  },
});

export default Feed;
