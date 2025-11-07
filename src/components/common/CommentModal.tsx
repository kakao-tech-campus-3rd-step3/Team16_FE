import BaseModal from '@/components/common/BaseModal';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { VscSend } from 'react-icons/vsc';
import { useState, useRef } from 'react';
import { typography } from '@/styles/typography';
import { CenteredLoader } from '@/components/common/LoadingSpinner';
import { format } from 'date-fns';
import { IoMdMore } from 'react-icons/io';
import BottomSheet from '@/components/common/BottomSheet';
import useAuthStore from '@/stores/authStore';
import { useComments } from '@/hooks/useComments';
import { useCreateComment } from '@/hooks/useCreateComment';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import PostingStatus from '@/components/common/PostingStatus';

interface CommentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postId: number;
  groupId: number;
  onUserClick: (userId: number) => void;
}

const CommentModal = ({ isOpen, setIsOpen, postId, groupId, onUserClick }: CommentModalProps) => {
  const [content, setContent] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number>(0);
  const { id: userId, profileImageUrl, nickname } = useAuthStore();

  // 스와이프 제스처를 위한 상태
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.4);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 댓글 조회
  const { data: comments, isPending } = useComments(postId, isOpen);

  // 댓글 작성
  const { mutate: postComment } = useCreateComment(postId, groupId, {
    userId: userId ?? 0,
    nickname: nickname ?? '',
    profileImageUrl: profileImageUrl ?? '',
  });

  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteComment(postId, groupId);

  const handleSubmit = (content: string) => {
    if (content.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    postComment(content);
    setContent(''); // 입력창 즉시 초기화
  };

  const handleClose = () => {
    // BottomSheet가 열려있으면 CommentModal을 닫지 않음
    if (isBottomSheetOpen) return;

    // 닫기 애니메이션 시작
    setIsClosing(true);
    setTranslateY(500); // 모달 높이만큼 아래로 이동
    setOverlayOpacity(0); // 오버레이 투명하게

    // 애니메이션 완료 후 모달 닫기
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setTranslateY(0);
      setOverlayOpacity(0.4); // 리셋
    }, 300); // transition 시간과 동일
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY;

    // 아래로만 드래그 가능
    if (deltaY > 0) {
      setTranslateY(deltaY);

      // 드래그 거리에 따라 오버레이 투명도 계산 (0 ~ 500px 범위)
      // deltaY가 0일 때 0.4, 500px일 때 0으로 점진적 변화
      const newOpacity = Math.max(0, 0.4 - (deltaY / 500) * 0.4);
      setOverlayOpacity(newOpacity);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY === null) return;

    // 100px 이상 드래그하면 모달 닫기
    if (translateY > 200) {
      // 닫기 애니메이션
      setIsClosing(true);
      setTouchStartY(null);
      setTranslateY(500); // 모달을 화면 아래로 완전히 이동
      setOverlayOpacity(0); // 오버레이 완전히 투명하게

      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        setTranslateY(0);
        setOverlayOpacity(0.4); // 리셋
      }, 300);
      return;
    }

    // 상태 리셋 (드래그가 충분하지 않았을 때)
    setTouchStartY(null);
    setTranslateY(0);
    setOverlayOpacity(0.4); // 오버레이도 원래대로
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      variant="bottom"
      overlayOpacity={overlayOpacity}
    >
      <Wrapper
        ref={wrapperRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: touchStartY === null || isClosing ? 'transform 0.3s ease' : 'none',
        }}
      >
        <HeaderArea
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <DragHandle />
          <Header>댓글</Header>
        </HeaderArea>

        <CommentList data-scrollable>
          {isPending ? (
            <CenteredLoader />
          ) : comments && comments.length > 0 ? (
            [...comments].reverse().map((comment: any) => {
              const date = new Date(comment.createdAt);
              const formattedDate = isNaN(date.getTime())
                ? '날짜 없음'
                : format(date, 'yyyy.MM.dd HH:mm');

              return (
                <CommentItem key={comment.commentId}>
                  <CommentRow>
                    <CommentHeader onClick={() => onUserClick(comment.commentUserId)}>
                      <ProfileImage src={comment.userProfileImageUrl} alt={comment.userNickname} />
                      <CommentContent>
                        <AuthorRow>
                          <Author>{comment.userNickname}</Author>
                          <CommentDate>{formattedDate}</CommentDate>
                        </AuthorRow>
                        <CommentText>{comment.content}</CommentText>
                      </CommentContent>
                    </CommentHeader>
                    {comment.commentId === 0 ? (
                      <StyledPostingStatus />
                    ) : (
                      userId == comment.commentUserId && (
                        <MoreButton
                          onClick={() => {
                            setSelectedCommentId(comment.commentId);
                            setIsBottomSheetOpen(true);
                          }}
                        >
                          <IoMdMore size={20} />
                        </MoreButton>
                      )
                    )}
                  </CommentRow>
                </CommentItem>
              );
            })
          ) : (
            <EmptyMessage>댓글이 없습니다.</EmptyMessage>
          )}
        </CommentList>
        <InputWrapper>
          <InputSection
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
          />
          <SendingButton size={24} onClick={() => handleSubmit(content)} />
        </InputWrapper>
      </Wrapper>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        options={[
          {
            label: '댓글 삭제',
            onClick: () => {
              deleteComment(selectedCommentId);
              setIsBottomSheetOpen(false);
            },
            variant: 'danger',
          },
        ]}
      />
    </BaseModal>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.white,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  touchAction: 'pan-y', // 수직 스크롤 허용
});

const DragHandle = styled.div({
  width: '40px',
  height: '4px',
  backgroundColor: colors.gray300,
  borderRadius: '2px',
  margin: '8px auto 0px',
  flexShrink: 0,
});

const HeaderArea = styled.div({
  cursor: 'grab',
  userSelect: 'none',
  '&:active': {
    cursor: 'grabbing',
  },
});

const Header = styled.div({
  padding: '12px',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
});

const CommentList = styled.div({
  height: '400px',
  padding: '12px',
  overflowY: 'auto',
  borderTop: `1px solid ${colors.gray300}`,
  borderBottom: `1px solid ${colors.gray300}`,
  display: 'flex',
  flexDirection: 'column-reverse',
  WebkitOverflowScrolling: 'touch',
  willChange: 'scroll-position',
  touchAction: 'pan-y',
  transform: 'translateZ(0)',
});

const CommentItem = styled.div({
  padding: '4px',
  borderBottom: `1px solid ${colors.gray200}`,
  '&:last-child': {
    borderBottom: 'none',
  },
});

const CommentRow = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '8px',
});

const CommentHeader = styled.div({
  display: 'flex',
  //alignItems: 'center',
  gap: '8px',
  marginBottom: '4px',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: colors.gray100,
  },
});

const ProfileImage = styled.img({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  objectFit: 'cover',
  backgroundColor: colors.gray200,
  flexShrink: 0,
  marginTop: '10px',
});

const CommentContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const AuthorRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '32px', // 프로필 이미지와 동일한 높이
});

const Author = styled.span({
  ...typography.small,
  fontWeight: 600,
  color: colors.black,
});

const CommentDate = styled.span({
  ...typography.small,
  fontSize: '11px',
  color: colors.gray500,
});

const CommentText = styled.div({
  ...typography.body,
  overflowWrap: 'anywhere',
  color: colors.black,
});

const EmptyMessage = styled.div({
  ...typography.body,
  color: colors.gray500,
  textAlign: 'center',
  marginTop: 'auto',
  marginBottom: 'auto',
});

const StyledPostingStatus = styled(PostingStatus)({
  marginTop: '10px',
});

const MoreButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  color: colors.gray600,
  flexShrink: 0,
  marginTop: '10px',
});

const InputWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const InputSection = styled.input({
  flex: 1,
  padding: '16px',
  borderRadius: '24px',
  margin: '16px',
  border: `1px solid ${colors.gray300}`,
  outlineColor: colors.primary,
  fontSize: '16px',
});

const SendingButton = styled(VscSend)({
  background: 'none',
  border: 'none',
  marginRight: '16px',
  cursor: 'pointer',
});

export default CommentModal;
