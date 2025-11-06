import { apiClient } from '@/api/apiClient';

interface BanMemberRequest {
  groupId: number;
  userId: number;
}

export const banMemberApi = async ({ groupId, userId }: BanMemberRequest) => {
  const response = await apiClient.post('/group/banned', {
    groupId,
    userId,
  });
  return response.data;
};
