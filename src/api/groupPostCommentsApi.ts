import { apiClient } from './apiClient';

export const fetchGroupPostComments = async (postId: number) => {
  const response = await apiClient.get(`/posts/${postId}/comments`);
  return response.data;
};

export const postGroupPostComment = async (postId: number, content: string) => {
  const response = await apiClient.post(`/comments`, { content, postId });
  return response.data;
};
