import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태: 함수 필드를 제외한 AuthState 조각
const initialState: Omit<
  AuthState,
  'setAccessToken' | 'setVerificationStatus' | 'clearTokens' | 'setUserInfo'
> = {
  accessToken: null,
  isAuthenticated: false,
  id: null,
  nickname: '익명',
  profileImage: '/data/profile.png',
  groups: { leaderOf: [], memberOf: [] },
  isStudentVerified: 'UNVERIFIED',
};

// zustand store with persist middleware (localStorage 자동 연동)
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      //유저정보 설정 (부분 병합)
      setUserInfo: (userInfo: UserInfo) => set((state) => ({ ...state, ...userInfo })),

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
  nickname: string;
  profileImage: string;
  groups: Groups;
  isStudentVerified: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  nickname: string;
  id: number | null;
  profileImage: string;
  groups: Groups;
  isStudentVerified: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
  setAccessToken: (accessToken: string) => void;
  setVerificationStatus: (status: 'VERIFIED' | 'UNVERIFIED' | 'PENDING') => void;
  clearTokens: () => void;
  setUserInfo: (userInfo: UserInfo) => void; // 전체 사용자 정보 설정 함수
}

export default useAuthStore;
