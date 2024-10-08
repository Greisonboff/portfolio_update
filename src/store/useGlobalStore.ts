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
  openDeletModal: { isOpen: false, calback: () => {} },
  setOpenDeletModal: (newOpenDeletModal) =>
    set(() => ({ openDeletModal: newOpenDeletModal })),
  chave: undefined,
  setChave: (newChave) => set(() => ({ chave: newChave })),
}));
