import { create } from 'zustand';

type CompareStoreType = {
  selectedItems: { title: string; details: string }[];
  setSelectedItems: (items: { title: string; details: string }[]) => void;
};

export const useCompareStore = create<CompareStoreType>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
}));
