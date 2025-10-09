import authStore from '@/stores/authStore';

export const isUserLeader = (groupId: number) => {
  const { groups } = authStore.getState();
  const isLeader = groups.leaderOf.some((id) => Number(id) === groupId);
  return isLeader;
};
