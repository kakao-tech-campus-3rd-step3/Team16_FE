import {apiClient} from '@/api/apiClient'

export const getMemberListApi = async (groupId: number) => {
  const response = await apiClient.get(`/group/${groupId}`);
  return response.data;
}