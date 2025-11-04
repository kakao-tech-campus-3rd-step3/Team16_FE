import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type { Member } from '../types';
import { FaCrown } from 'react-icons/fa';

interface MemberItemProps {
  member: Member;
  onClick?: () => void;
}

export const MemberItem = ({ member, onClick }: MemberItemProps) => {
  const { nickname, profileImageUrl, groupRole } = member;

  return (
    <ItemWrapper onClick={onClick}>
      <ProfileImage src={profileImageUrl} />
      <UserInfo>
        <UserName>{nickname}</UserName>
      </UserInfo>
      {groupRole === 'LEADER' && <CrownIcon />}
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
  objectFit: 'cover',
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

const CrownIcon = styled(FaCrown)({
  color: colors.primary,
  fontSize: '20px',
  flexShrink: 0,
});
