import create from 'zustand';
import { LoanFormType, LoanFormDefaultValues } from '@/types/schema/loan';

interface LoanFormState {
  formData: LoanFormType;
  setFormData: (data: LoanFormType) => void;
}

export const useLoanFormStore = create<LoanFormState>((set) => ({
  formData: LoanFormDefaultValues,
  setFormData: (data: LoanFormType) => set({ formData: data }),
}));