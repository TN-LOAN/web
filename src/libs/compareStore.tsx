import { LoanResponseType } from '@/types/schema/loan';
import { create } from 'zustand';

type CompareStoreType = {
  selectedItems: { data: LoanResponseType }[];
  setSelectedItems: (items: { data: any, dataSet: string }[]) => void;
};

export const useCompareStore = create<CompareStoreType>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
}));
