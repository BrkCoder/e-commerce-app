import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../services/Users';


interface UserState {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: User | null) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'user-profile', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
