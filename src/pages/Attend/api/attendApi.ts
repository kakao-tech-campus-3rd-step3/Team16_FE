import { apiClient } from '@/api/apiClient';

export const getUserAttendanceStatus = async (groupId: number, planId: number) => {
  const response = await apiClient.get(`/groups/${groupId}/attends/${planId}`);
  return response.data;
};
