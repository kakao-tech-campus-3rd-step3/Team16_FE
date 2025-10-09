import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태: 함수 필드를 제외한 AuthState 조각
const initialState: Omit<
  AuthState,
  | 'setAccessToken'
  | 'setVerificationStatus'
  | 'clearTokens'
  | 'setUserInfo'
  | 'setActiveGroups'
  | 'setGroupMembership'
  | 'clearGroupMembership'
> = {
  accessToken: null,
  isAuthenticated: false,
  id: null,
  nickname: '익명',
  profileImageUrl: '/data/profile.png',
  groups: { leaderOf: [], memberOf: [] },
  isStudentVerified: 'UNVERIFIED',
  activeGroups: [],
  groupMembershipById: {},
};

// zustand store with persist middleware (localStorage 자동 연동)
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      //유저정보 설정 (부분 병합)
      setUserInfo: (userInfo: UserInfo) => set((state) => ({ ...state, ...userInfo })),

      setActiveGroups: (groups) => set({ activeGroups: groups }),
      // 액세스 토큰 설정
      setAccessToken: (accessToken: string) =>
        set({
          accessToken,
          isAuthenticated: true,
        }),

      // verificationStatus 설정
      setVerificationStatus: (isStudentVerified) => set({ isStudentVerified }),

      // 토큰 삭제 (로그아웃)
      clearTokens: () =>
        set({
          ...initialState,
        }),

      // 그룹 멤버십 상태 저장/업데이트
      setGroupMembership: (groupId, membership) =>
        set((state) => ({
          groupMembershipById: {
            ...state.groupMembershipById,
            [groupId]: membership,
          },
        })),

      // 특정 그룹 멤버십 상태 제거
      clearGroupMembership: (groupId) =>
        set((state) => {
          const copy = { ...state.groupMembershipById } as Record<string, GroupMembership>;
          delete copy[groupId];
          return { groupMembershipById: copy } as Partial<AuthState> as any;
        }),
    }),
    {
      name: 'auth-storage', // localStorage key 이름
    }
  )
);

type Groups = {
  leaderOf: string[]; // 리더인 그룹 ID 배열
  memberOf: string[]; // 멤버인 그룹 ID 배열
};

interface UserInfo {
  id: string;
  nickname: string;
  profileImageUrl: string;
  groups: Groups;
  isStudentVerified: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  id: string | null;
  nickname: string;
  profileImageUrl: string;
  groups: Groups;
  isStudentVerified: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
  activeGroups: string[];
  groupMembershipById: Record<string, GroupMembership>;
  setAccessToken: (accessToken: string) => void;
  setVerificationStatus: (status: 'VERIFIED' | 'UNVERIFIED' | 'PENDING') => void;
  clearTokens: () => void;
  setUserInfo: (userInfo: UserInfo) => void; // 전체 사용자 정보 설정 함수
  setActiveGroups: (groupIds: string[]) => void;
  setGroupMembership: (groupId: string, membership: GroupMembership) => void;
  clearGroupMembership: (groupId: string) => void;
}

type MembershipStatus = 'LOADING' | 'ERROR' | 'ACTIVE' | 'LEFT' | 'NONE';

type GroupMembership = {
  status: MembershipStatus;
  isMember: boolean;
  isLeft: boolean;
  isNew: boolean;
  isLoading: boolean;
  isError: boolean;
};

export default useAuthStore;
