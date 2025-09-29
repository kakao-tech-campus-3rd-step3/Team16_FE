import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { SlLike } from 'react-icons/sl';
import { FaRegComment } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupPosts } from '@/api/groupApi';
import { useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Author {
  id: string;
  nickname: string;
  avatarUrl: string | null;
}

interface Post {
  id: string;
  groupId: string;
  author: Author;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  commentCount: number;
  isLikedByMe: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GroupPostsResponse {
  items: Post[];
  nextCursor: string | null;
}

const GroupBoard = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery<GroupPostsResponse>({
    queryKey: ['groupPosts', groupId],
    queryFn: () => fetchGroupPosts(Number(groupId)),
  });

  const posts = data?.items || [];

  return (
    <Wrapper>
      {posts.map((post: Post) => (
        <PostContent key={post.id}>
          <Header>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{post.createdAt}</PostDate>
          </Header>
          {post.images.length > 0 && <PostImage src={post.images[0]} alt={post.title} />}
          {post.content && <PostDescription>{post.content}</PostDescription>}
          <PostActions>
            <ActionButton>
              <SlLike />
              <span>좋아요 {post.likeCount}</span>
            </ActionButton>
            <ActionButton>
              <FaRegComment />
              <span>댓글 {post.commentCount}</span>
            </ActionButton>
          </PostActions>
        </PostContent>
      ))}
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
