import { TOOLS_URL } from '@constants/index';
import { TokenPrices } from 'src/interfaces';
import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

interface ApolloPriceStore {
  price: number;
  pricesForAllTokens: TokenPrices[];
  fetchPrice: () => Promise<void>;
  fetchPricesForAllTokens: () => Promise<void>;
  init: () => Promise<void>;
}

interface WalletModalStore {
  showWalletModal: boolean;
  toggleWalletModal: () => void;
}

// interface DisclaimerStore {
//   isDisclaimerRead: boolean;
//   setDisclaimerRed: () => void;
// }

interface DisclaimerModalStore {
  isDisclaimerRead: boolean;
  setDisclaimerRead: () => void;
  showDisclaimerModal: boolean;
  openDisclaimerModal: () => void;
  closeDisclaimerModal: () => void;
}

export const useTokenPrice = create<ApolloPriceStore>((set, get) => ({
  price: 0,
  pricesForAllTokens: [],
  fetchPrice: async () => {
    const response = await fetch(`${TOOLS_URL}/prices/XOR`);

    if (response.ok) {
      const apolloPrice = await response.json();
      set({ price: apolloPrice });
    }
  },
  fetchPricesForAllTokens: async () => {
    const response = await fetch(`${TOOLS_URL}/prices`);

    if (response.ok) {
      const pricesForAllTokens = (await response.json()) as TokenPrices[];
      set({ pricesForAllTokens });
    }
  },
  init: async () => {
    await get().fetchPrice();
    await get().fetchPricesForAllTokens();

    setInterval(() => {
      get().fetchPrice();
      get().fetchPricesForAllTokens();
    }, 60000);
  },
}));

export const useWalletModal = create<WalletModalStore>((set, get) => ({
  showWalletModal: false,
  toggleWalletModal: () => {
    set({ showWalletModal: !get().showWalletModal });
  },
}));

// export const useDisclaimer = create<
//   DisclaimerStore,
//   [['zustand/persist', DisclaimerStore]]
// >(
//   persist(
//     set => ({
//       isDisclaimerRead: false,
//       setDisclaimerRed: () => set({ isDisclaimerRead: true }),
//     }),
//     {
//       name: 'disclaimer',
//       storage: createJSONStorage(() => sessionStorage, {}),
//     },
//   ),
// );

export const useDisclaimerModal = create<DisclaimerModalStore>(set => ({
  isDisclaimerRead: false,
  setDisclaimerRead: () => set({ isDisclaimerRead: true }),
  showDisclaimerModal: false,
  openDisclaimerModal: () => set({ showDisclaimerModal: true }),
  closeDisclaimerModal: () => set({ showDisclaimerModal: false }),
}));
