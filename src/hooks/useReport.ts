import { useMutation } from '@tanstack/react-query';
import type { ReportRequest, ReportResponse, ReportTargetType } from '@/api/reportApi';
import { reportApi } from '@/api/reportApi';

export function useReport(targetType: ReportTargetType, targetId: number) {
  return useMutation<ReportResponse, Error, ReportRequest>({
    mutationFn: async (data) => {
      const response = await reportApi.submitReport(targetType, targetId, data);
      return response.data;
    },
  });
}
