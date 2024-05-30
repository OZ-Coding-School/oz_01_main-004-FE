import { create } from "zustand";

interface loading {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export const useLoadingStore = create<loading>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
