import { useMutation } from '@tanstack/react-query';
import type { ReportRequest, ReportResponse, TargetType } from '@/api/reportApi';
import { createReport } from '@/api/reportApi';

export const useReport = (targetType: TargetType, targetId: number) => {
  return useMutation<ReportResponse, Error, ReportRequest>({
    mutationFn: (payload) => createReport(targetType, targetId, payload),
  });
};
