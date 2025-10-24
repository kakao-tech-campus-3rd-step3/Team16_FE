import { apiClient } from './apiClient';

export const fetchGroupApplications = async (groupId: number) => {
  const res = await apiClient.get(`/group/${groupId}/join-requests`);
  return res.data;
};

export const approveGroupApplication = async (groupId: number, userId: number) => {
  const res = await apiClient.post(`/group/join`, { groupId, userId });
  return res.data;
};

export const rejectGroupApplication = async (groupId: number, userId: number) => {
  const res = await apiClient.post(`/group/reject`, { groupId, userId });
  return res.data;
};

