import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { HiCheck } from 'react-icons/hi';
import { HiOutlineX } from 'react-icons/hi';
import { getUserInfoById } from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';

interface ApplicationItemProps {
  data: {
    userId: number;
    intro: string;
    profileImageUrl: string;
  };
  onAccept?: (userId: number) => void;
  onReject?: (userId: number) => void;
}

const ApplicationItem = ({ data, onAccept, onReject }: ApplicationItemProps) => {
  const { userId, intro, profileImageUrl } = data;
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfoById(userId),
  });

  const nickname = userInfo?.nickname;

  return (
    <ItemWrapper>
      <ProfileImage src={profileImageUrl || '/data/profile.png'} alt={`${nickname} 프로필`} />
      <UserInfo>
        <UserName>{nickname}</UserName>
        <Message>{intro}</Message>
      </UserInfo>
      <ButtonWrapper>
        <RejectButton onClick={() => onReject?.(userId)}>
          <HiOutlineX />
        </RejectButton>
        <AcceptButton onClick={() => onAccept?.(userId)}>
          <HiCheck />
        </AcceptButton>
      </ButtonWrapper>
    </ItemWrapper>
  );
};

export default ApplicationItem;

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

const Message = styled.span({
  ...typography.body,
  color: colors.gray600,
});

const ButtonWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: spacing.spacing2,
});

const AcceptButton = styled.button({
  color: colors.white,
  backgroundColor: colors.primary,
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  width: 'clamp(36px, 5vw, 48px)',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
});

const RejectButton = styled.button({
  color: colors.error,
  backgroundColor: colors.errorLight,
  border: 'none',
  cursor: 'pointer',
  borderRadius: '50%',
  width: 'clamp(36px, 5vw, 48px)',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
});
