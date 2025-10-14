import { useMutation } from '@tanstack/react-query';
import { applyToJoinGroup } from '../api/applyToJoinGroupApi';
import { useNavigate } from 'react-router-dom';

const useApplyToJoinGroup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { groupId: number; intro: string }) =>
      applyToJoinGroup(data.groupId, data.intro),
    onSuccess: () => {
      alert('모임 가입 신청이 성공적으로 제출되었습니다!');
      navigate(-1);
    },
    onError: () => {
      alert('모임 가입 신청에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useApplyToJoinGroup;
