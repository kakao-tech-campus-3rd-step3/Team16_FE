import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupPosts } from '@/api/groupApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CommentModal from './components/CommentModal';
import { format } from 'date-fns';
import { useToggleLike } from './hooks/useToggleLike';
import FullScreenLoader from '@/components/common/LoadingSpinner';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { isUserMember } from '@/utils/groupMemberShip';

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
}

const GroupBoard = () => {
  const { groupId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ['groupPosts', Number(groupId)],
    queryFn: () => fetchGroupPosts(Number(groupId)),
  });
  const { mutate: toggleLike } = useToggleLike(Number(groupId));

  const posts = data || [];

  const isUserMemberOfGroup = isUserMember(Number(groupId));

  if (isPending) {
    return <FullScreenLoader />;
  }
  return (
    <Wrapper>
      {posts.map((post: Post) => (
        <PostContent key={post.postId}>
          <Header>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{format(new Date(post.createdAt), 'yyyy.MM.dd HH:mm')}</PostDate>
          </Header>
          {post.imageUrls.length > 0 && <PostImage src={post.imageUrls[0]} alt={post.title} />}
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
              }}
            >
              <FaRegComment />
              <span>댓글 {post.commentCount}</span>
            </ActionButton>
          </PostActions>
        </PostContent>
      ))}

      <CommentModal isOpen={isOpen} setIsOpen={setIsOpen} postId={postId} />

      {isUserMemberOfGroup && (
        <EditButtonWrapper>
          <EditButton
            onClick={() => {
              console.log(`create-post/${groupId}`);
              navigate(`/create-post/${groupId}`);
            }}
          >
            <EditIcon />
          </EditButton>
        </EditButtonWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  backgroundColor: colors.gray100,
});

const Header = styled.div({
  padding: spacing.spacing2,
});

const PostImage = styled.img({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
});

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

export default GroupBoard;
