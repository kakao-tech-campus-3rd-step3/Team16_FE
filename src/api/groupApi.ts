import axios from 'axios';
<<<<<<< HEAD

interface Review {
  id: number;
  content: string;
}

interface GroupHomeResponse {
  id: number;
  name: string;
  intro: string;
  safetyTag: string;
  createdAt: string;
  capacity: number;
  reviews: Review[];
  groupImg: string;
}
=======
import { apiClient } from './apiClient';

export const fetchGroups = async () => {
  const response = await apiClient.get('/groups');
  return response.data;
};
>>>>>>> develop

export const fetchGroupHome = async (_groupId: number): Promise<GroupHomeResponse> => {
  // 목데이터를 axios로 불러오기
  const response = await axios.get('/data/mockData.json');
  return response.data;

  // 실제 API 호출 (백엔드 준비되면 위 코드 삭제하고 아래 주석 해제)
<<<<<<< HEAD
  // const response = await axios.get(`/api/groups/${groupId}`);
=======
  // const response = await apiClient.get(`/groups/${_groupId}`);
>>>>>>> develop
  // return response.data;
};

export const fetchGroupPosts = async (_groupId: number) => {
  const response = await axios.get('/data/groupPosts.json');
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
<<<<<<< HEAD
=======
  // 실제 API 호출 (백엔드 준비되면 위 코드 삭제하고 아래 주석 해제)
  // const response = await apiClient.get(`/groups/${groupId}/rule`);
  // return response.data;
>>>>>>> develop
};

export const fetchGroupSchedule = async (_groupId: number) => {
  const response = await axios.get('/data/groupSchedule.json');
  return response.data;
<<<<<<< HEAD
};
=======
  // 실제 API 호출 (백엔드 준비되면 위 코드 삭제하고 아래 주석 해제)
  // const response = await apiClient.get(`/groups/${groupId}/rule`);
  // return response.data;
};

interface Review {
  id: number;
  content: string;
}

interface GroupHomeResponse {
  id: number;
  name: string;
  intro: string;
  safetyTag: string;
  createdAt: string;
  capacity: number;
  reviews: Review[];
  groupImg: string;
}

interface CreateGroupFormData {
  groupName: string;
  groupIntro: string;
}

export async function createGroupApi(data: CreateGroupFormData) {
  const response = await axios.post('/data/createGroup.json', data);
  return response.data;
}
>>>>>>> develop
