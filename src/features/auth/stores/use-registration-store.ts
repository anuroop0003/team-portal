import { create } from "zustand";

interface RegistrationState {
  step: number;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setStep: (step: number) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  step: 1,
  showPassword: false,
  showConfirmPassword: false,
  setStep: (step) => set({ step }),
  setShowPassword: (show) => set({ showPassword: show }),
  setShowConfirmPassword: (show) => set({ showConfirmPassword: show }),
  reset: () =>
    set({
      step: 1,
      showPassword: false,
      showConfirmPassword: false,
    }),
}));
