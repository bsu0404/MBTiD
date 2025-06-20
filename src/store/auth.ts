import { UserMbtiProfile } from "@/types/profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  userInfo: UserMbtiProfile | null;
  setToken: (accessToken: string) => void;
  setUserInfo: (userInfo: UserMbtiProfile) => void;
  clearToken: () => void;
}

export const getAccessToken = () => {
  const raw = localStorage.getItem("auth-storage");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);

    return parsed.state?.accessToken ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      userInfo: null,
      setToken: (accessToken) =>
        set({
          accessToken,
          isLoggedIn: true,
        }),
      setUserInfo: (userInfo) =>
        set({
          userInfo, // 프로필 정보 저장
        }),
      clearToken: () =>
        set({
          accessToken: null,
          isLoggedIn: false,
          userInfo: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
      }),
    }
  )
);

export default useAuthStore;
