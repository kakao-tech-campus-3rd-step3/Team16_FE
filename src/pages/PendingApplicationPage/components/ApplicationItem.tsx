import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { HiCheck } from 'react-icons/hi';
import { HiOutlineX } from 'react-icons/hi';

const ApplicationItem = () => {
  return (
    <ItemWrapper>
      <ProfileImage />
      <UserInfo>
        <UserName>유저이름</UserName>
        <Message>신청이유</Message>
      </UserInfo>
      <ButtonWrapper>
        <DisapproveButton>
          <HiOutlineX />
        </DisapproveButton>
        <ApproveButton>
          <HiCheck />
        </ApproveButton>
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
  margin: `${spacing.spacing4}px ${spacing.spacing4}px`,
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

const ApproveButton = styled.button({
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

const DisapproveButton = styled.button({
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
