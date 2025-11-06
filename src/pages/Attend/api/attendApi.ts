import { apiClient } from '@/api/apiClient';

export const getUserAttendanceStatus = async (groupId: number, planId: number) => {
  const response = await apiClient.get(`/groups/${groupId}/attends/${planId}`);
  console.log('AttendanceResponse:', response.data);
  return response.data;
};

export const submitAttendance = async (groupId: number, planId: number) => {
  const response = await apiClient.post(`/groups/${groupId}/attend`, {
    planId,
  });
  return response.data;
};
