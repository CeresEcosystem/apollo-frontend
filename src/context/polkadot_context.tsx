import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { useWallets } from '@polkadot-onboard/react';
import { Account, BaseWallet } from '@polkadot-onboard/core';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { showErrorNotify } from '@utils/toast';

interface PolkadotContextType {
  api: ApiPromise | null;
  keyring: Keyring;
  loading: boolean;
  accounts: Account[] | undefined;
  selectedWalletProvider: BaseWallet | undefined;
  selectedAccount: Account | undefined;
  setSelectedAccount: (account: Account) => void;
  wallets: BaseWallet[] | undefined;
  connect: (wallet: BaseWallet) => void;
}

const PolkadotContext = createContext<PolkadotContextType | null>(null);

const PolkadotProvider = ({ children }: { children: React.ReactNode }) => {
  const { wallets } = useWallets();

  const [accounts, setAccounts] = useState<Account[] | undefined>([]);
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [selectedWalletProvider, setSelectedWalletProvider] = useState<
    BaseWallet | undefined
  >();

  const keyring = useRef<Keyring>(new Keyring());

  useEffect(() => {
    const setupApi = async () => {
      const provider = new WsProvider('wss://westend-rpc.polkadot.io');
      const api = await ApiPromise.create({ provider });

      setApi(api);
      setLoading(false);
    };

    setupApi();
  }, []);

  const connect = useCallback(
    async (walletProvider: BaseWallet) => {
      if (!isBusy) {
        setIsBusy(true);
        try {
          await walletProvider.connect();
          setSelectedWalletProvider(walletProvider);
        } catch (err) {
          showErrorNotify('Connection failed', true);
        }
        setIsBusy(false);
      }
    },
    [isBusy],
  );

  useEffect(() => {
    if (!selectedWalletProvider) {
      setAccounts([]);
      return () => {};
    }

    const promUnsubscribe = selectedWalletProvider.subscribeAccounts(
      (accs: Account[]) => {
        if (accs.length > 0) {
          setAccounts(accs);
        } else {
          showErrorNotify('Connection failed', true);
          setSelectedWalletProvider(undefined);
          setSelectedAccount(undefined);
        }
      },
    );

    return () => {
      promUnsubscribe.then(unsub => unsub());
    };
  }, [selectedWalletProvider]);

  return (
    <PolkadotContext.Provider
      value={{
        api,
        keyring: keyring.current,
        loading,
        accounts,
        selectedWalletProvider,
        selectedAccount,
        setSelectedAccount,
        wallets,
        connect,
      }}
    >
      {children}
    </PolkadotContext.Provider>
  );
};

export default PolkadotProvider;

export const usePolkadot = (): PolkadotContextType => {
  const contextValue = useContext(PolkadotContext);
  if (!contextValue) {
    throw new Error(
      'usePolkadot must be used within a PolkadotContextProvider',
    );
  }
  return contextValue;
};
