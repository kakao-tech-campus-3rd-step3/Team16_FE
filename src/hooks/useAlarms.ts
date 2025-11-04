import { useQuery } from '@tanstack/react-query';
import { getAlarms } from '@/api/alarmApi';
import type { Alarm } from '@/api/alarmApi';

export function useAlarms() {
  return useQuery<Alarm[], Error>({
    queryKey: ['alarms'],
    queryFn: getAlarms,
  });
}
