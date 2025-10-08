import { apiClient } from './apiClient';

export type TargetType = 'USER' | 'GROUP' | 'POST' | 'COMMENT';

export interface ReportRequest {
  reasonCode: string;
  reason: string;
}

export interface ReportResponse {
  id: number;
  reporterId: number;
  targetType: TargetType;
  targetId: number;
  reasonCode: string;
  reason: string;
  status: 'PENDING' | 'RESOLVE' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export const reportApi = {
  submitReport: (targetType: string, targetId: number, data: ReportRequest) =>
    apiClient.post(`/reports/${targetType}/${targetId}`, data),
};
