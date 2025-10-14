import { apiClient } from './apiClient';

export const fetchGroupReviews = async (groupId: number) => {
  const response = await apiClient.get(`/groups/reviews/${groupId}`);
  return response.data;
};
