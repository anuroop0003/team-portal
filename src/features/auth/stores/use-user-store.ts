import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserMeResponse } from "../api/auth.types";

interface UserState {
  user: UserMeResponse | null;
  setUser: (user: UserMeResponse | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
