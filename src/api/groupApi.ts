import axios from "axios";

export interface Review {
  id: number;
  content: string;
}

export interface GroupHomeResponse {
  id: number;
  name: string;
  intro: string;
  safetyTag: string;
  createdAt: string;
  capacity: number;
  reviews: Review[];
  groupImg: string;
}

export const fetchGroupHome = async (groupId: number): Promise<GroupHomeResponse> => {
  // 목데이터를 axios로 불러오기
  const response = await axios.get('/src/data/mockData.json');
  return response.data;
  
  // 실제 API 호출 (백엔드 준비되면 위 코드 삭제하고 아래 주석 해제)
  // const response = await axios.get(`/api/groups/${groupId}`);
  // return response.data;
};
