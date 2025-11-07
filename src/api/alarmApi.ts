import { apiClient } from './apiClient';

export interface Alarm {
  alarmId: number;
  receiverId: number;
  notificationType: string;
  relatedGroupId: number;
  relatedUserId: number;
  message: string;
  isRead: boolean;
  nickname: string;
  isReviewed: boolean;
}

export const getAlarms = async (): Promise<Alarm[]> => {
  const { data } = await apiClient.get('/notification');
  return data;
};
