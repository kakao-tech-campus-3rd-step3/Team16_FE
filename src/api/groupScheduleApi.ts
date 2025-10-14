import { apiClient } from './apiClient';

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

// 그룹의 특정 플랜(일정) 상세 조회
export const getGroupPlan = async (groupId: number, planId: number): Promise<GroupPlan> => {
  const { data } = await apiClient.get<GroupPlan>(`/groups/${groupId}/plans/${planId}`);
  return data;
};
