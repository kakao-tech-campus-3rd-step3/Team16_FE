//import { apiClient } from './apiClient';

export interface GroupPlan {
  title: string;
  description: string;
  capacity: number;
  startTime: Date | string;
  endTime: Date | string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

// 목데이터
export const mockGroupPlan: GroupPlan = {
  title: '정기모임 1회차',
  description: '9월 첫째 주에 진행하는 출사 정기모임 1회차입니다.',
  capacity: 8,
  startTime: '2025-09-30T09:00:00',
  endTime: '2025-09-30T18:00:00',
  location: {
    name: '전남대학교 용봉탑',
    latitude: 35.17529475708064,
    longitude: 126.90613446497647,
  },
};

// 그룹의 특정 플랜(일정) 상세 조회
export const getGroupPlan = async (_groupId: number, _planId: number): Promise<GroupPlan> => {
  // 실제 API 호출 대신 목데이터 반환 (테스트용)
  // const { data } = await apiClient.get<GroupPlan>(`/api/groups/${groupId}/plans/${planId}`);
  // return data;
  //startTime as Date
  mockGroupPlan.startTime = new Date(mockGroupPlan.startTime);
  mockGroupPlan.endTime = new Date(mockGroupPlan.endTime);
  return Promise.resolve(mockGroupPlan);
};
