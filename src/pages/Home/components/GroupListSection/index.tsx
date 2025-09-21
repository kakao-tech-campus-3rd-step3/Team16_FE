import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import TagBadge from '@/components/common/TagBadge';
import { useQuery } from '@tanstack/react-query';
import { fetchGroups } from '@/api/groupApi';
import { useNavigate } from 'react-router-dom';

const GroupListSection = () => {
  const navigate = useNavigate();

  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <GroupListContainer>
      {groups &&
        groups.map((group: any) => (
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
                <TagBadge tag={group.safetyTag} />
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
}));

const GroupTag = styled.div(({ theme }) => ({
  ...theme.typography.small,
  color: colors.primary,
}));
