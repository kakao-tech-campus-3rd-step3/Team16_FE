export type GroupRole = 'LEADER' | 'MEMBER';

export interface Member {
  id: number;
  groupName: string;
  nickname: string;
  groupRole: GroupRole;
  profileImageUrl: string;
  userId: number;
}

export type Members = Member[];
