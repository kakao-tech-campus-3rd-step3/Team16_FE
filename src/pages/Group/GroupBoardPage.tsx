import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGroupPosts, deleteGroupPost } from '@/api/groupApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CommentModal from '@/components/common/CommentModal';
import { format } from 'date-fns';
import { useToggleLike } from '../../hooks/useToggleLike';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { isUserMember } from '@/utils/groupMemberShip';
//import { useScrollLock } from '@/hooks/useScrollLock';
import ImageViewerModal from '@/components/common/ImageViewerModal';
import UserPageModal from '@/components/common/UserPageModal';
import useAuthStore from '@/stores/authStore';
import { IoMdMore } from 'react-icons/io';
import BottomSheet from '@/components/common/BottomSheet';
import PostingStatus from '@/components/common/PostingStatus';
import CustomAlert from '@/components/common/CustomAlert';
import { useAlert } from '@/hooks/useAlert';

interface Post {
  postId: number;
  authorNickname: string;
  title: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLike: boolean;
  authorProfileImageUrl: string;
  authorId: number;
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

const GroupBoard = () => {
  const { isOpen: isAlertOpen, alertOptions, showAlert, closeAlert } = useAlert();
  const { groupId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const navigate = useNavigate();
  const { id: userId } = useAuthStore();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ['groupPosts', Number(groupId)],
    queryFn: () => fetchGroupPosts(Number(groupId)),
  });

  const { mutate: toggleLike } = useToggleLike(Number(groupId));

  const { mutate: deletePost } = useMutation({
    mutationFn: (postId: number) => deleteGroupPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupPosts', Number(groupId)] });
      setIsBottomSheetOpen(false);
    },
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['groupPosts', Number(groupId)] });
      const previousPosts = queryClient.getQueryData(['groupPosts', Number(groupId)]);

      queryClient.setQueryData(['groupPosts', Number(groupId)], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((post: Post) => post.postId !== postId);
      });

      return { previousPosts };
    },
    onError: (error) => {
      console.error('게시글 삭제 실패:', error);
      showAlert({ message: '게시글 삭제에 실패했습니다.', type: 'error' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['groupPosts', Number(groupId)] });
    },
  });

  const posts = data || [];

  const isUserMemberOfGroup = isUserMember(Number(groupId));

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <Wrapper>
      {posts.length === 0 ? (
        <EmptyMessage>게시글이 없습니다</EmptyMessage>
      ) : (
        posts.map((post: Post) => {
          const date = new Date(post.createdAt);
          const formattedDate = isNaN(date.getTime())
            ? '날짜 없음'
            : format(date, 'yyyy.MM.dd HH:mm');

          return (
            <PostContent key={post.postId}>
              <Header>
                <AuthorRow>
                  <AuthorSection
                    onClick={() => {
                      setSelectedUserId(post.authorId);
                      setIsUserModalOpen(true);
                    }}
                  >
                    <AuthorProfile src={post.authorProfileImageUrl} alt={post.authorNickname} />
                    <AuthorInfo>
                      <AuthorName>{post.authorNickname}</AuthorName>
                      <PostDate>{formattedDate}</PostDate>
                    </AuthorInfo>
                  </AuthorSection>
                  {post.postId === 0 ? (
                    <PostingStatus />
                  ) : (
                    userId == post.authorId && (
                      <IoMdMore
                        size={24}
                        onClick={() => {
                          setSelectedPostId(post.postId);
                          setIsBottomSheetOpen(true);
                        }}
                      />
                    )
                  )}
                </AuthorRow>
                <PostTitle>{post.title}</PostTitle>
              </Header>
              {post.imageUrls.length > 0 && (
                <ImageCarousel images={post.imageUrls} altText={post.title} />
              )}
              {post.content && <PostDescription>{post.content}</PostDescription>}
              <PostActions>
                <ActionButton
                  onClick={() => {
                    if (post.postId === 0) return; // 게시 중일 때는 좋아요 불가
                    console.log('post.postId', post.postId);
                    toggleLike({ postId: post.postId, isLike: post.isLike });
                  }}
                  disabled={post.postId === 0}
                >
                  {post.isLike ? <FaThumbsUp color={colors.primary} /> : <FaRegThumbsUp />}
                  <span>좋아요 {post.likeCount}</span>
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    if (post.postId === 0) return; // 게시 중일 때는 댓글 불가
                    setIsOpen(true);
                    setPostId(post.postId);
                  }}
                  disabled={post.postId === 0}
                >
                  <FaRegComment />
                  <span>댓글 {post.commentCount}</span>
                </ActionButton>
              </PostActions>
            </PostContent>
          );
        })
      )}

      <CommentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postId={postId}
        groupId={Number(groupId)}
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

      {isUserMemberOfGroup && (
        <EditButtonWrapper>
          <EditButton
            onClick={() => {
              navigate(`/create-post/${groupId}`, { replace: true });
            }}
          >
            <EditIcon />
          </EditButton>
        </EditButtonWrapper>
      )}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        options={[
          {
            label: '수정',
            onClick: () => {
              navigate(`/edit-post/${groupId}/${selectedPostId}`, { replace: true });
            },
          },
          {
            label: '삭제',
            onClick: () => {
              if (confirm('정말 삭제하시겠습니까?')) {
                deletePost(selectedPostId);
              }
            },
            variant: 'danger',
          },
        ]}
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
  backgroundColor: colors.gray100,
  display: 'flex',
  flexDirection: 'column', // 역순으로 표시
  minHeight: '100vh',
});

const Header = styled.div({
  padding: spacing.spacing2,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
});

const AuthorRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.spacing2,
});

const AuthorSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.spacing2,
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: colors.gray100,
  },
});

const AuthorProfile = styled.img({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  backgroundColor: colors.gray200,
});

const AuthorInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

const AuthorName = styled.span({
  ...typography.body,
  fontWeight: 600,
  color: colors.black,
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
  '&:disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
});

const EditButtonWrapper = styled.div({
  position: 'fixed',
  left: '50%',
  width: '100%',
  transform: 'translateX(-10%)',
  maxWidth: '720px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bottom: 30,
});

const EditButton = styled.button({
  backgroundColor: colors.primary,
  width: 56,
  height: 56,
  borderRadius: '50%',
  border: 'none',
  zIndex: 1000,
});

const EditIcon = styled(FaPencilAlt)({
  color: colors.white,
  width: 20,
  height: 20,
});

const EmptyMessage = styled.div({
  ...typography.body,
  color: colors.gray500,
  textAlign: 'center',
  marginTop: '50px',
});

export default GroupBoard;
