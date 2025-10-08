import { apiClient } from './apiClient';

export const likeGroupPost = async (postId: number) => {
  const response = await apiClient.post(`/posts/likes`, { postId });
  return response.data;
};

export const unlikeGroupPost = async (postId: number) => {
  const response = await apiClient.delete(`/posts/${postId}/likes`);
  return response.data;
};
