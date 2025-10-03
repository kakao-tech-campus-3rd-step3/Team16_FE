import { apiClient } from './apiClient';

export const postGroupReview = async (content: string, groupId: number) => {
  await apiClient.post('/groups/reviews', { content, groupId });
};

export const leaveGroup = async (groupId: number) => {
  await apiClient.post('/group/leave', { groupId });
};
