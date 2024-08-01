import { TOKEN_NAME } from '@constants/index';
import { TokenPrices } from 'src/interfaces';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ApolloPriceStore {
  prices: TokenPrices[];
  apolloPrice: number;
  fetchPrices: () => Promise<void>;
  init: () => Promise<void>;
}

interface WalletModalStore {
  showWalletModal: boolean;
  toggleWalletModal: () => void;
}

interface DisclaimerStore {
  isDisclaimerRead: boolean;
  setDisclaimerRead: () => void;
}

interface DisclaimerModalStore {
  showDisclaimerModal: boolean;
  openDisclaimerModal: () => void;
  closeDisclaimerModal: () => void;
}

const tokens = ['APOLLO', 'XOR', 'DAI', 'ETH', 'VAL', 'PSWAP', 'DOT'];

export const useTokenPrice = create<ApolloPriceStore>((set, get) => ({
  prices: [],
  apolloPrice: 0,
  fetchPrices: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_TOOLS_BACKEND_URL}/prices`,
    );

    if (response.ok) {
      const pricesForAllTokens = (await response.json()) as TokenPrices[];

      const pricesData = pricesForAllTokens.filter(t =>
        tokens.includes(t.token),
      );

      set({ prices: pricesData });
      set({
        apolloPrice:
          pricesForAllTokens.find(t => t.token === TOKEN_NAME.toUpperCase())
            ?.price ?? 0,
      });
    }
  },
  init: async () => {
    await get().fetchPrices();

    setInterval(() => {
      get().fetchPrices();
    }, 60000);
  },
}));

export const useWalletModal = create<WalletModalStore>((set, get) => ({
  showWalletModal: false,
  toggleWalletModal: () => {
    set({ showWalletModal: !get().showWalletModal });
  },
}));

export const useDisclaimer = create<
  DisclaimerStore,
  [['zustand/persist', DisclaimerStore]]
>(
  persist(
    set => ({
      isDisclaimerRead: false,
      setDisclaimerRead: () => set({ isDisclaimerRead: true }),
    }),
    {
      name: 'disclaimer',
      storage: createJSONStorage(() => localStorage, {}),
    },
  ),
);

export const useDisclaimerModal = create<DisclaimerModalStore>(set => ({
  showDisclaimerModal: false,
  openDisclaimerModal: () => set({ showDisclaimerModal: true }),
  closeDisclaimerModal: () => set({ showDisclaimerModal: false }),
}));
