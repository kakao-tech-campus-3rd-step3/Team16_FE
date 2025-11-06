import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isUserLeader } from '@/utils/groupMemberShip';
import ReportModal from '@/components/ReportModal';

interface DrawerProps {
  onClose: () => void;
}

const GroupDrawer = ({ onClose }: DrawerProps) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  const handleLeave = () => {
    navigate(`/group/${groupId}/leave`, { replace: true });
    onClose();
  };

  const handleReport = () => {

    setIsReportModalOpen(true);
  };

  const handleAttend = () => {
    navigate(`/group/${groupId}/pending-application`);
    onClose();
  };

  const handleGroupRules = () => {
    navigate(`/group/${groupId}/create-ground-rule`);
    onClose();
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <Drawer isVisible={isVisible}>
        <Header>그룹 메뉴</Header>
        <MenuList>
          <MenuItem onClick={handleLeave}>모임 탈퇴하기</MenuItem>
          <MenuItem onClick={handleReport}>모임 신고하기</MenuItem>
          {isUserLeader(Number(groupId)) && (
            <>
              <MenuItem onClick={handleAttend}>가입신청 리스트</MenuItem>
              <MenuItem onClick={handleGroupRules}>그라운드룰 수정</MenuItem>
            </>
          )}
        </MenuList>
      </Drawer>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetType="GROUP"
        targetId={Number(groupId)}
      />
    </>
  );
};

export default GroupDrawer;

const Overlay = styled.div({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: 1000,
});

const Drawer = styled.div<{ isVisible: boolean }>(({ isVisible }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '260px',
  height: '100vh',
  backgroundColor: colors.white,
  boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  gap: '16px',
  transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.25s ease',
}));

const Header = styled.div({
  ...typography.h3,
  color: colors.black,
  marginBottom: '12px',
});

const MenuList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const MenuItem = styled.button({
  ...typography.body,
  background: 'none',
  border: 'none',
  textAlign: 'left',
  padding: '12px 0',
  cursor: 'pointer',
  color: colors.black,
  '&:hover': { color: colors.primary },
});
