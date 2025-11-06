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

export interface PlanParticipant {
  id: number;
  participantStatus: 'ATTENDING';
  plan: {
    id: number;
    title: string;
  };
  user: {
    id: number;
    nickname: string;
  };
}

// 그룹의 특정 플랜(일정) 상세 조회
export const getGroupPlan = async (groupId: number, planId: number): Promise<GroupPlan> => {
  const { data } = await apiClient.get<GroupPlan>(`/groups/${groupId}/plans/${planId}`);
  return data;
};

// 플랜 참여자 목록 조회
export const getPlanParticipants = async (planId: number): Promise<PlanParticipant[]> => {
  const { data } = await apiClient.get<PlanParticipant[]>(`/plans/${planId}/participants`);
  return data;
};

// 플랜 참여하기
export const joinPlan = async (planId: number): Promise<void> => {
  await apiClient.post(`/plans/${planId}/participants`);
};
