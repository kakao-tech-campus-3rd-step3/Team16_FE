import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import TagBadge from '@/components/common/TagBadge';

const GroupListSection = () => {
  return (
    <>
      <GroupListContainer>
        {Array.from({ length: 10 }).map((_, idx) => (
          <GroupListItem key={idx}>
            <GroupImg />
            <GroupInfo>
              <GroupHeader>
                <GroupName>지식 한줌</GroupName>
                <TagBadge tag="안전" />
              </GroupHeader>
              <GroupDesc>서로 한 줌의 지식을 나누는 사람</GroupDesc>
              <GroupTag>#스터디</GroupTag>
            </GroupInfo>
          </GroupListItem>
        ))}
      </GroupListContainer>
    </>
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
