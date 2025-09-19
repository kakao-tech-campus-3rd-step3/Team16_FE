import axios from 'axios';

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
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const createReport = async (
  targetType: TargetType,
  targetId: number,
  payload: ReportRequest
): Promise<ReportResponse> => {
  const { data } = await axios.post<ReportResponse>(
    `/api/reports/${targetType}/${targetId}`,
    payload
  );
  return data;
};
