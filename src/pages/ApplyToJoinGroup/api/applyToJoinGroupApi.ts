import { apiClient } from '@/api/apiClient';

export const applyToJoinGroup = async (groupId: number, intro: string) => {
  const response = await apiClient.post(`/group/sign`, { intro, groupId });
  return response.data;
};
