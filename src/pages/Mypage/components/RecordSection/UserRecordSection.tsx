import TagBadge from '@/components/common/TagBadge';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserHistory } from '@/api/userApi';
import type { GroupHistory } from '@/api/userApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserRecordSectionProps {
  userId: number;
}

const UserRecordSection = ({ userId }: UserRecordSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const { data } = useSuspenseQuery<GroupHistory[]>({
    queryKey: ['userHistory', userId],
    queryFn: () => getUserHistory(userId),
  });

  if (!data || data.length === 0) return <Wrapper>활동 이력이 없습니다.</Wrapper>;

  const displayedData = isExpanded ? data : data.slice(0, 3);
  const hasMoreThanThree = data.length > 3;

  return (
    <Wrapper>
      <Title>활동 이력</Title>
      <RecordList>
        {displayedData.map((record) => (
          <RecordListItem
            key={record.groupId}
            onClick={() => {
              navigate(`/group/${record.groupId}`);
            }}
          >
            <GroupStatusInfo>
              <GroupName>{record.name}</GroupName>
              <GroupStatus>
                {record.groupMemberStatus === 'ACTIVE' ? '현재 가입중' : '활동 종료'}
              </GroupStatus>
              <TagBadge tag={record.safetyTag} />
            </GroupStatusInfo>
            <GroupDate>
              기간: {record.joinAt} ~ {record.leftAt ?? 'ing'}
            </GroupDate>
          </RecordListItem>
        ))}
      </RecordList>

      {hasMoreThanThree && (
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '접기' : `더보기 (+${data.length - 3})`}
        </ToggleButton>
      )}
    </Wrapper>
  );
};

export default UserRecordSection;

const Wrapper = styled.section({
  margin: `0 ${spacing.spacing4}px`,
  padding: `${spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
  backgroundColor: colors.white,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
});

const Title = styled.span({
  ...typography.h2,
  color: colors.black,
  marginBottom: spacing.spacing2,
});

const RecordList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing5,
});

const RecordListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing1,
  cursor: 'pointer',
});

const GroupStatusInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: spacing.spacing1,
  alignItems: 'center',
});

const GroupName = styled.div({
  ...typography.body,
});

const GroupDate = styled.div({
  ...typography.small,
  color: colors.gray500,
});

const GroupStatus = styled.div({
  color: colors.primary,
  ...typography.small,
  borderRadius: '16px',
  padding: '4px 6px',
  backgroundColor: colors.white,
  border: `1px solid ${colors.primary}`,
  lineHeight: 1,
});

const ToggleButton = styled.button({
  ...typography.small,
  color: colors.gray600,
  backgroundColor: 'transparent',
  border: 'none',
  padding: `${spacing.spacing2}px 0`,
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: spacing.spacing2,

  '&:hover': {
    color: colors.primary,
  },
});
