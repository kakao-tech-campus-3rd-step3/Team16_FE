import { apiClient } from './apiClient';

export type ReportTargetType = 'USER' | 'GROUP' | 'POST' | 'COMMENT';

export type ReportResponseStatus = 'PENDING' | 'RESOLVE' | 'REJECTED';

export interface ReportRequest {
  reasonCode: string;
  reason: string;
}

export interface ReportResponse {
  id: number;
  reporterId: number;
  targetType: ReportTargetType;
  targetId: number;
  reasonCode: string;
  reason: string;
  status: ReportResponseStatus;
  createdAt: string;
  updatedAt: string;
}

export const reportApi = {
  submitReport: (targetType: string, targetId: number, data: ReportRequest) =>
    apiClient.post(`/reports/${targetType}/${targetId}`, data),
};
