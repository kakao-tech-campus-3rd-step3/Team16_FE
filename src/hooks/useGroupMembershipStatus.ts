import { useQuery } from '@tanstack/react-query';
import { getUserGroupHistory } from '@/api/userApi';
import useAuthStore from '@/stores/authStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function useGroupMembershipStatus() {
  const { id: userId, setActiveGroups, setGroupMembership, clearGroupMembership } = useAuthStore();
  const { groupId } = useParams();
  const numericGroupId = Number(groupId);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userGroupHistory', userId],
    queryFn: () => getUserGroupHistory(userId!),
    enabled: !!userId,
    retry: false,
  });

  let status: 'LOADING' | 'ERROR' | 'ACTIVE' | 'LEFT' | 'NONE' = 'LOADING';
  let isMember = false;
  let isLeft = false;
  let isNew = false;

  if (isLoading) {
    status = 'LOADING';
  } else if (isError || !userId) {
    status = 'ERROR';
  } else {
    const record = history?.find((h) => h.groupId === numericGroupId);

    if (!record) {
      status = 'NONE';
    } else if (record.groupMemberStatus === 'ACTIVE') {
      status = 'ACTIVE';
      isMember = true;
    } else if (record.groupMemberStatus === 'LEFT') {
      status = 'LEFT';
      isLeft = true;
    }

    isNew = status === 'NONE';
  }

  useEffect(() => {
    if (!groupId || status === 'LOADING' || status === 'ERROR') return;

    const membership = {
      status,
      isMember,
      isLeft,
      isNew,
      isLoading,
      isError,
    };

    const prev = useAuthStore.getState().groupMembershipById[String(groupId)];
    if (JSON.stringify(prev) === JSON.stringify(membership)) return;

    if (status === 'ACTIVE') {
      const current = useAuthStore.getState().activeGroups;
      if (!current.includes(String(groupId))) {
        setActiveGroups([...current, String(groupId)]);
      }
    } else {
      const current = useAuthStore.getState().activeGroups.filter((id) => id !== String(groupId));
      setActiveGroups(current);
    }

    if (status === 'NONE') clearGroupMembership(String(groupId));
    else setGroupMembership(String(groupId), membership);
  }, [status, groupId]);

  return { status, isMember, isLeft, isNew, isLoading, isError };
}
