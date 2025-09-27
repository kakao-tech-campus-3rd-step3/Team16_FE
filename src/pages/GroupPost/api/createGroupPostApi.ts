import { apiClient } from '@/api/apiClient';

export interface CreateGroupPostRequest {
  groupId: number;
  title: string;
  content: string;
  imageUrls?: string[];
}

export interface CreateGroupPostResponse {
  postId: string;
}

export const createGroupPostApi = async (data: CreateGroupPostRequest) => {
  console.log(data);

  const response = await apiClient.post(`/groups/posts`, data);
  console.log(response.data);
  return response.data;
};
