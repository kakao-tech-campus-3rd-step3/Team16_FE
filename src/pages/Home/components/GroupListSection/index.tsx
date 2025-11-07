import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import TagBadge from '@/components/common/TagBadge';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface Group {
  groupId: number;
  name: string;
  intro: string;
  safetyTag: string;
  coverImageUrl: string;
  createdAt: string;
  capacity: number;
  score?: number;
}

interface GroupListSectionProps {
  groups: Group[];
  isLoading: boolean;
  isError: boolean;
}

const GroupListSection = ({ groups, isLoading, isError }: GroupListSectionProps) => {
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (groups.length === 0) {
    return <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>;
  }

  return (
    <GroupListContainer>
      {groups.map((group) => (
        <GroupListItem
          key={group.groupId}
          onClick={() => {
            navigate(`/group/${group.groupId}`);
          }}
        >
          <GroupImg>
            <Img src={group.coverImageUrl} alt="" />
          </GroupImg>
          <GroupInfo>
            <GroupHeader>
              <GroupName>{group.name}</GroupName>
              <TagBadge score={group.score ?? 75} />
            </GroupHeader>
            <GroupDesc>{group.intro}</GroupDesc>
            <GroupTag />
          </GroupInfo>
        </GroupListItem>
      ))}
    </GroupListContainer>
  );
};

export default GroupListSection;

const GroupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

const GroupListItem = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px',
  borderBottom: `1px solid ${theme.colors.gray300}`,
  backgroundColor: theme.colors.white,
}));

const GroupImg = styled.div`
  width: 20%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background-color: #ddd; /* 임시 배경 */
  flex-shrink: 0;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GroupInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GroupName = styled.span(({ theme }) => ({
  ...theme.typography.h3,
  color: colors.black,
}));

const GroupDesc = styled.p(({ theme }) => ({
  ...theme.typography.body,
  color: colors.black,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const GroupTag = styled.div(({ theme }) => ({
  ...theme.typography.small,
  color: colors.primary,
}));

const NoResultsMessage = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px',
  ...theme.typography.body,
  color: theme.colors.gray500,
}));
