import create from 'zustand';
import { LoanFormType, LoanFormDefaultValues } from '@/types/schema/loan';

const saveToLocalStorage = (state: LoanFormType) => {
  localStorage.setItem('loanFormData', JSON.stringify(state));
};

const loadFromLocalStorage = (): LoanFormType => {
  const storedData = localStorage.getItem('loanFormData');
  return storedData ? JSON.parse(storedData) : LoanFormDefaultValues;
};

interface LoanFormState {
  formData: LoanFormType;
  setFormData: (data: LoanFormType) => void;
  resetFormData: () => void; 
}

export const useLoanFormStore = create<LoanFormState>((set) => ({
  formData: loadFromLocalStorage(), 
  setFormData: (data: LoanFormType) => {
    set({ formData: data });
    saveToLocalStorage(data); 
  },

  resetFormData: () => { 
    const defaultData = LoanFormDefaultValues;
    set({ formData: defaultData });
    saveToLocalStorage(defaultData);
  },
}));