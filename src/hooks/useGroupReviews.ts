import { useQuery } from '@tanstack/react-query';
import { fetchGroupReviews } from '@/api/groupReviewsApi';

export const useGroupReviews = (groupId: number) => {
  return useQuery({
    queryKey: ['groupReviews', groupId],
    queryFn: () => fetchGroupReviews(groupId),
    enabled: !!groupId,
  });
};
