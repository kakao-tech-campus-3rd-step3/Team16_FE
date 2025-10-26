import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type { Member } from '../types';

interface MemberItemProps {
  member: Member;
}

export const MemberItem = ({ member }: MemberItemProps) => {
  const { nickname, profileImageUrl } = member;

  return (
    <ItemWrapper>
      <ProfileImage src={profileImageUrl} />
      <UserInfo>
        <UserName>{nickname}</UserName>
      </UserInfo>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${spacing.spacing4}px ${spacing.spacing4}px`,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  backgroundColor: colors.white,
});

const ProfileImage = styled.img({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: colors.gray200,
});

const UserInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: spacing.spacing3,
  flex: 1,
});

const UserName = styled.span({
  ...typography.h3,
  color: colors.black,
  marginBottom: spacing.spacing1,
});
