import TagBadge from '@/components/common/TagBadge';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';

const RecordSection = () => {
  return (
    <Wrapper>
      <Title>나의 활동 이력</Title>
      <RecordList>
        <RecordListItem>
          <GroupStatusInfo>
            <GroupName>한사랑 산악회</GroupName>
            <GroupStatus>현재 가입중</GroupStatus>
            <TagBadge tag="CAUTION" />
          </GroupStatusInfo>
          <GroupDate>기간: 2023. 03. 18 ~ ing</GroupDate>
        </RecordListItem>
        <RecordListItem>
          <GroupStatusInfo>
            <GroupName>한사랑 산악회</GroupName>
            <GroupStatus>현재 가입중</GroupStatus>
            <TagBadge tag="DANGER" />
          </GroupStatusInfo>
          <GroupDate>기간: 2023. 03. 18 ~ ing</GroupDate>
        </RecordListItem>
        <RecordListItem>
          <GroupStatusInfo>
            <GroupName>한사랑 산악회</GroupName>
            <GroupStatus>현재 가입중</GroupStatus>
            <TagBadge tag="SAFE" />
          </GroupStatusInfo>
          <GroupDate>기간: 2023. 03. 18 ~ ing</GroupDate>
        </RecordListItem>
      </RecordList>
    </Wrapper>
  );
};

export default RecordSection;

const Wrapper = styled.section({
  margin: `0px ${spacing.spacing4}px`,
  padding: `${spacing.spacing4}px ${spacing.spacing4}px`,
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
