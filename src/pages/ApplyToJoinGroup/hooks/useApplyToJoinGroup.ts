import { useMutation } from '@tanstack/react-query';
import { applyToJoinGroup } from '../api/applyToJoinGroupApi';
import { useNavigate } from 'react-router-dom';

const useApplyToJoinGroup = (showAlert: (options: { message: string; type: 'success' | 'error' }) => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { groupId: number; intro: string }) =>
      applyToJoinGroup(data.groupId, data.intro),
    onSuccess: () => {
      showAlert({ message: '모임 가입 신청이 성공적으로 제출되었습니다!', type: 'success' });
      navigate(-1);
    },
    onError: () => {
      showAlert({ message: '모임 가입 신청에 실패했습니다. 다시 시도해주세요.', type: 'error' });
    },
  });
};

export default useApplyToJoinGroup;
