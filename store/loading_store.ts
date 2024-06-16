import { create } from "zustand";

interface loading {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export const useLoadingStore = create<loading>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

interface issue {
  isIssue: boolean;
  setIsIssue: (issue: boolean) => void;
}
export const useIssueStore = create<issue>((set) => ({
  isIssue: false,
  setIsIssue: (isIssue) => set({ isIssue }),
}));
