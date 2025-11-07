import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserHistory, type GroupHistory } from '@/api/userApi';
import useAuthStore from '@/stores/authStore';

const OptionButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const authState = useAuthStore();
  const userId = authState.id;

  const { data: myGroups } = useQuery({
    queryKey: ['myGroups', userId],
    queryFn: () => getUserHistory(userId || 0),
    enabled: !!userId && isOpen,
  });

  const activeGroups = myGroups?.filter(
    (group: GroupHistory) => group.groupMemberStatus === 'ACTIVE'
  );

  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          <MenuContainer>
            <MenuHeader>내 모임</MenuHeader>
            <GroupList>
              {activeGroups && activeGroups.length > 0 ? (
                activeGroups.map((group: GroupHistory) => (
                  <GroupItem
                    key={group.groupId}
                    onClick={() => {
                      navigate(`/group/${group.groupId}`);
                      setIsOpen(false);
                    }}
                  >
                    <GroupName>{group.name}</GroupName>
                    <SafetyBadge tag={group.safetyTag}>{group.safetyTag}</SafetyBadge>
                  </GroupItem>
                ))
              ) : (
                <EmptyMessage>가입된 모임이 없습니다</EmptyMessage>
              )}
            </GroupList>
            <CreateButton
              onClick={() => {
                navigate('/create-group');
                setIsOpen(false);
              }}
            >
              모임 만들기
            </CreateButton>
          </MenuContainer>
        </>
      )}
      <Button isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose size={30} /> : <FaPlus size={30} />}
      </Button>
    </>
  );
};

export default OptionButton;

const Button = styled.button<{ isOpen: boolean }>(({ isOpen }) => ({
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  width: isOpen ? '50px' : '50px',
  height: isOpen ? '50px' : '50px',
  borderRadius: '50%',
  backgroundColor: isOpen ? colors.gray700 : colors.primary,
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001,
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
}));

const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
});

const MenuContainer = styled.div({
  position: 'fixed',
  bottom: '140px',
  right: '20px',
  width: '280px',
  maxHeight: '400px',
  backgroundColor: colors.white,
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const MenuHeader = styled.div({
  ...typography.h3,
  padding: spacing.spacing4,
  borderBottom: `1px solid ${colors.gray200}`,
  color: colors.black,
});

const GroupList = styled.div({
  flex: 1,
  overflowY: 'auto',
  padding: spacing.spacing2,
  minHeight: '100px',
  maxHeight: '250px',
});

const GroupItem = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${spacing.spacing3}px ${spacing.spacing2}px`,
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: colors.gray100,
  },
});

const GroupName = styled.span({
  ...typography.body,
  color: colors.black,
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SafetyBadge = styled.span<{ tag: string }>(({ tag }) => ({
  ...typography.small,
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: 'bold',
  backgroundColor: tag === 'SAFE' ? '#E8F5E9' : tag === 'CAUTION' ? '#FFF3E0' : '#FFEBEE',
  color: tag === 'SAFE' ? '#2E7D32' : tag === 'CAUTION' ? '#F57C00' : '#C62828',
}));

const EmptyMessage = styled.div({
  ...typography.body,
  color: colors.gray500,
  textAlign: 'center',
  padding: `${spacing.spacing6}px ${spacing.spacing4}px`,
});

const CreateButton = styled.button({
  ...typography.body,
  fontWeight: 'bold',
  width: '100%',
  padding: spacing.spacing4,
  backgroundColor: colors.primary,
  color: colors.white,
  border: 'none',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 0.9,
  },
});
