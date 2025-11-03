import { apiClient } from './apiClient';

export const fetchFeedPosts = async () => {
  const response = await apiClient.get('/groups/posts/feeds');
  return response.data;
};
