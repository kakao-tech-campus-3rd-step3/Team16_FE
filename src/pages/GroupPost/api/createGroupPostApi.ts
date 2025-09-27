import { apiClient } from '@/api/apiClient';

export interface CreateGroupPostRequest {
  groupId: number;
  title: string;
  content: string;
  imageUrls?: string[];
}

export const createGroupPostApi = async (data: CreateGroupPostRequest) => {
  await apiClient.post(`/groups/posts`, data);
};
