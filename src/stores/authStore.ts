import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  verificationStatus: 'pending' | 'verified' | 'unverified' | null;
  setAccessToken: (accessToken: string) => void;
  setVerificationStatus: (status: 'pending' | 'verified' | 'unverified' | null) => void;
  clearTokens: () => void;
}

// zustand store with persist middleware (localStorage 자동 연동)
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      verificationStatus: null,

      // 액세스 토큰 설정
      setAccessToken: (accessToken: string) =>
        set({
          accessToken,
          isAuthenticated: true,
        }),

      // verificationStatus 설정
      setVerificationStatus: (status) => set({ verificationStatus: status }),

      // 토큰 삭제 (로그아웃)
      clearTokens: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          verificationStatus: null,
        }),
    }),
    {
      name: 'auth-storage', // localStorage key 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        verificationStatus: state.verificationStatus,
      }),
    }
  )
);

export default useAuthStore;
