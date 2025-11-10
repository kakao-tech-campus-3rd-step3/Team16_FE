import { useMutation, useQueryClient } from '@tanstack/react-query';
import { banMemberApi } from '../api/banMemberApi';
import { useAlert } from '@/hooks/useAlert';

export const useBanMember = (groupId: number) => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: banMemberApi,
    onSuccess: () => {
      // 멤버 리스트 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['members', groupId.toString()] });
    },
    onError: (error) => {
      console.error('멤버 강퇴 실패:', error);
      showAlert({ message: '멤버 강퇴에 실패했습니다.', type: 'error' });
    },
  });
};
