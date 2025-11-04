import axios from 'axios';
import { apiClient } from './apiClient';

export const fetchGroups = async () => {
  const response = await apiClient.get('/groups');
  return response.data;
};

export const fetchGroupHome = async (groupId: number): Promise<GroupHomeResponse> => {
  const response = await apiClient.get(`/groups/${groupId}`);
  return response.data;
};

//게시글 전체 조회
export const fetchGroupPosts = async (groupId: number) => {
  const response = await apiClient.get(`/groups/${groupId}/posts`);
  return response.data;
};

//게시글 삭제
export const deleteGroupPost = async (postId: number) => {
  console.log('Deleting post with ID:', postId);
  const response = await apiClient.delete(`/groups/posts/${postId}`);
  return response.data;
};

//게시글 단건 조회
export const fetchGroupPost = async (groupId: number, postId: number) => {
  const response = await apiClient.get(`/groups/${groupId}/posts/${postId}`);
  return response.data;
};

//게시글 수정
export const updateGroupPost = async (
  postId: number,
  data: { title: string; content: string; imageUrls?: string[] }
) => {
  const response = await apiClient.put(`/groups/posts/${postId}`, data);
  return response.data;
};

interface GroupMembershipResponse {
  isMember: boolean;
}

export const checkGroupMembership = async (_groupId: number): Promise<GroupMembershipResponse> => {
  const isMember = true;

  return {
    isMember,
  };

  // 실제 API 호출 (백엔드 준비되면 위 코드 삭제하고 아래 주석 해제)
  // const response = await axios.get(`/api/groups/${groupId}/membership`);
  // return response.data;
};

//대시보드 페이지 api
export const fetchGroundRules = async (_groupId: number) => {
  const response = await axios.get('/data/groundRules.json');
  return response.data;
  // 실제 API 호출 (백엔드 준비되면 위 코드 삭제하고 아래 주석 해제)
  // const response = await apiClient.get(`/groups/${groupId}/rule`);
  // return response.data;
};

export const fetchGroupSchedule = async (groupId: number) => {
  const response = await apiClient.get(`/groups/${groupId}/plans`);
  return response.data;
};

interface GroupHomeResponse {
  groupId: number;
  name: string;
  intro: string;
  safetyTag: string;
  coverImageUrl: string;
  createdAt: string;
  capacity: number;
}

interface CreateGroupFormData {
  name: string;
  intro: string;
}

export async function createGroupApi(data: CreateGroupFormData) {
  const response = await apiClient.post('/groups', { ...data, capacity: 1 });
  return response.data;
}
