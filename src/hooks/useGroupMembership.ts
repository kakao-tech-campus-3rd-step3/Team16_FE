import { useQuery } from '@tanstack/react-query';
import { checkGroupMembership } from '@/api/groupApi';

export const useGroupMembership = (groupId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ['groupMembership', groupId],
    queryFn: () => checkGroupMembership(Number(groupId)),
  });

  return { isMember: data?.isMember, isLoading };
};
