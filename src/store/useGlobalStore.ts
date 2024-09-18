import create from "zustand";
import { StoreState } from "../types";

export const useGlobalStore = create<StoreState>((set) => ({
  item: null,
  setEditItemModal: (newItem) => set(() => ({ item: newItem })),
  listType: null,
  setListType: (newListType) => set(() => ({ listType: newListType })),
  openFeedBack: { isOpen: false, successStatus: true },
  setOpenFeedBack: (newOpenFeedBack) =>
    set(() => ({ openFeedBack: newOpenFeedBack })),
}));