import { create } from "zustand";

export interface NavStore {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  activeNav: "home",
  setActiveNav: (nav: string) => set({ activeNav: nav }),
}));
