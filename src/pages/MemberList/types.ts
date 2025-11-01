export type GroupRole = 'LEADER' | 'MEMBER';

export interface Member {
  id: number;
  groupName: string;
  nickname: string;
  groupRole: GroupRole;
  profileImageUrl: string;
}

export type Members = Member[];
