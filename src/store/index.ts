import { TOOLS_URL } from '@constants/index';
import { create } from 'zustand';

interface ApolloPriceStore {
  price: number;
  fetchPrice: () => Promise<void>;
  init: () => Promise<void>;
}

interface WalletModalStore {
  showWalletModal: boolean;
  toggleWalletModal: () => void;
}

export const useApolloPrice = create<ApolloPriceStore>((set, get) => ({
  price: 0,
  fetchPrice: async () => {
    const response = await fetch(`${TOOLS_URL}/prices/XOR`);

    if (response.ok) {
      const apolloPrice = await response.json();
      set({ price: apolloPrice });
    }
  },
  init: async () => {
    await get().fetchPrice();
    setInterval(get().fetchPrice, 60000);
  },
}));

export const useWalletModal = create<WalletModalStore>((set, get) => ({
  showWalletModal: false,
  toggleWalletModal: () => {
    set({ showWalletModal: !get().showWalletModal });
  },
}));
