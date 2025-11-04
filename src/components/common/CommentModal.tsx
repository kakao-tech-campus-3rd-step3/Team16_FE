import BaseModal from '@/components/common/BaseModal';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { fetchGroupPostComments } from '@/api/groupPostCommentsApi';
import { useQuery } from '@tanstack/react-query';
import { VscSend } from 'react-icons/vsc';
import { useState } from 'react';
import { usePostComment } from '@/hooks/usePostComment';
import { useQueryClient } from '@tanstack/react-query';
import { typography } from '@/styles/typography';
import { CenteredLoader } from '@/components/common/LoadingSpinner';
import { format } from 'date-fns';

interface CommentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postId: number;
  onUserClick: (userId: number) => void;
}

const CommentModal = ({ isOpen, setIsOpen, postId, onUserClick }: CommentModalProps) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const { data: comments, isPending } = useQuery({
    queryKey: ['groupPostComments', postId],
    queryFn: () => fetchGroupPostComments(postId),
    enabled: isOpen,
  });

  const { mutate: postComment } = usePostComment(postId);

  const handleSubmit = (content: string) => {
    if (content.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    postComment(content, {
      onSuccess: () => {
        setContent('');
        queryClient.invalidateQueries({ queryKey: ['groupPostComments', postId] });
      },
      onError: (error: any) => {
        console.error('댓글 등록 실패:', error);
        alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="bottom">
      <Wrapper>
        <Header>댓글</Header>

        <CommentList>
          {isPending ? (
            <CenteredLoader />
          ) : comments && comments.length > 0 ? (
            comments.map((comment: any) => {
              const date = new Date(comment.createdAt);
              const formattedDate = isNaN(date.getTime())
                ? '날짜 없음'
                : format(date, 'yyyy.MM.dd HH:mm');

              return (
                <CommentItem key={comment.commentId}>
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
    </BaseModal>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.white,
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
});

const Header = styled.div({
  padding: '16px',
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
});

const CommentItem = styled.div({
  padding: '4px',
  borderBottom: `1px solid ${colors.gray200}`,
  '&:last-child': {
    borderBottom: 'none',
  },
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
  padding: '40px 0',
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
});

const SendingButton = styled(VscSend)({
  background: 'none',
  border: 'none',
  marginRight: '16px',
  cursor: 'pointer',
});

export default CommentModal;
