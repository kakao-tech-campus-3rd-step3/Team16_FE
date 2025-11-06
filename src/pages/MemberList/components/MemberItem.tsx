import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import type { Member } from '../types';
import { FaCrown } from 'react-icons/fa';
import { IoPersonRemoveOutline } from 'react-icons/io5';

interface MemberItemProps {
  member: Member;
  onClick?: () => void;
  onBan?: (userId: number) => void;
  showBanButton?: boolean;
}

export const MemberItem = ({ member, onClick, onBan, showBanButton = false }: MemberItemProps) => {
  const { nickname, profileImageUrl, groupRole, userId } = member;

  const handleBanClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 프로필 클릭 이벤트 방지
    if (window.confirm(`${nickname}님을 강퇴하시겠습니까?`)) {
      onBan?.(userId);
    }
  };

  return (
    <ItemWrapper onClick={onClick}>
      <ProfileImage src={profileImageUrl} />
      <UserInfo>
        <UserName>{nickname}</UserName>
      </UserInfo>
      {groupRole === 'LEADER' && <CrownIcon />}
      {showBanButton && groupRole !== 'LEADER' && (
        <BanButton onClick={handleBanClick}>
          <IoPersonRemoveOutline size={20} />
        </BanButton>
      )}
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

const BanButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  backgroundColor: 'transparent',
  border: `1px solid ${colors.gray300}`,
  borderRadius: '8px',
  cursor: 'pointer',
  color: colors.error,
});
