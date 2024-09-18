export interface StoreState {
  item: ItemType | null;
  setEditItemModal: (item: ItemType | null) => void;
  listType: "projetos" | "certificate" | null;
  setListType: (listType: "projetos" | "certificate" | null) => void;
  openFeedBack: FeedBackProp;
  setOpenFeedBack: (openFeedBack: FeedBackProp) => void;
}

export interface ItemType {
  caminho_imagem?: string;
  descricao?: string;
  link?: string;
  link_git?: string;
  nome_projeto?: string;
  categoria?: string;
  key?: string;
  nome_curso?: string;
}

interface FeedBackProp {
  successStatus?: boolean;
  isOpen: boolean;
  message?: string;
}