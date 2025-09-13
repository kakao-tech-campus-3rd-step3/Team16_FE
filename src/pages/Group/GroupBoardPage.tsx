import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { SlLike } from 'react-icons/sl';
import { FaRegComment } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupPosts } from '@/api/groupApi';
import { useParams } from 'react-router-dom';

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

export default GroupBoard;
