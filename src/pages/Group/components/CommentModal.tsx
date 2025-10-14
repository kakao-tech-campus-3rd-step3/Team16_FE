import BaseModal from '@/components/common/BaseModal';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { fetchGroupPostComments } from '@/api/groupPostCommentsApi';
import { useQuery } from '@tanstack/react-query';
import { VscSend } from 'react-icons/vsc';
import { useState } from 'react';
import { usePostComment } from '../hooks/usePostComment';
import { useQueryClient } from '@tanstack/react-query';
import { typography } from '@/styles/typography';
import { CenteredLoader } from '@/components/common/LoadingSpinner';

const CommentModal = ({ isOpen, setIsOpen, postId }: any) => {
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
            comments.map((comment: any) => (
              <CommentItem key={comment.commentId}>
                <Author>{comment.userNickname}</Author>
                <CommentText>{comment.content}</CommentText>
              </CommentItem>
            ))
          ) : (
            <CommentItem>댓글이 없습니다.</CommentItem>
          )}
        </CommentList>
        <InputWrapper>
          <InputSection value={content} onChange={(e) => setContent(e.target.value)} />
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
  padding: '24px',
  overflowY: 'auto',
  borderTop: `1px solid ${colors.gray300}`,
  borderBottom: `1px solid ${colors.gray300}`,
});

const CommentItem = styled.div({
  padding: '8px 0',
});

const InputSection = styled.input({
  flex: 1,
  padding: '16px',
  borderRadius: '24px',
  margin: '16px',
  border: `1px solid ${colors.gray300}`,
  outlineColor: colors.primary,
});

const InputWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const SendingButton = styled(VscSend)({
  background: 'none',
  border: 'none',
  marginRight: '16px',
  cursor: 'pointer',
});

const Author = styled.h1({
  ...typography.small,
  color: colors.gray600,
});

const CommentText = styled.div({
  ...typography.body,
  overflowWrap: 'anywhere',
});
export default CommentModal;
