import { apiClient } from '@/api/apiClient';

interface CreateScheduleParams {
  title: string;
  startTime: Date;
  endTime: Date;
  location: { name: string; latitude: number; longitude: number };
  capacity: number;
  description: string;
}

export const createSchedule = async ({
  payload,
  groupId,
}: {
  payload: CreateScheduleParams;
  groupId: number;
}) => {
  const response = await apiClient.post(`/groups/${groupId}/plans`, payload);
  return response.data;
};

export const updateSchedule = async ({
  payload,
  groupId,
  planId,
}: {
  payload: CreateScheduleParams;
  groupId: number;
  planId: number;
}) => {
  const response = await apiClient.patch(`/groups/${groupId}/plans/${planId}`, payload);
  return response.data;
};

export const deleteSchedule = async ({ groupId, planId }: { groupId: number; planId: number }) => {
  const response = await apiClient.delete(`/groups/${groupId}/plans/${planId}`);
  return response.data;
};
