import { LoanResponseType, LoanType } from '@/types/schema/loan';
import { create } from 'zustand';

type CompareStoreType = {
  selectedItems: { data: LoanType }[];
  setSelectedItems: (items: { data: any }[]) => void;
};

export const useCompareStore = create<CompareStoreType>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
}));
