import authStore from '@/stores/authStore';

export const isUserMember = (groupId: number) => {
  const { groups } = authStore.getState();
  //leaderOf 나 memberOf 중 하나라도 groupId와 일치하면 true 반환
  const isMember =
    groups.leaderOf.some((id) => Number(id) === groupId) ||
    groups.memberOf.some((id) => Number(id) === groupId);
  return isMember;
};

export const isUserLeader = (groupId: number) => {
  const { groups } = authStore.getState();
  const isLeader = groups.leaderOf.some((id) => Number(id) === groupId);
  return isLeader;
};
