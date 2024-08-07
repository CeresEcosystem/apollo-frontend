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
import { POLKADOT_ACCOUNT, POLKADOT_SOURCE } from '@constants/index';
import { options } from '@utils/sora_options';
import { ApiOptions } from '@polkadot/api/types';

interface PolkadotContextType {
  api: ApiPromise | undefined;
  keyring: Keyring;
  loading: boolean;
  accounts: Account[] | undefined;
  selectedWalletProvider: BaseWallet | undefined;
  selectedAccount: Account | undefined;
  saveSelectedAccount: (account: Account) => void;
  wallets: BaseWallet[] | undefined;
  connect: (wallet: BaseWallet) => void;
  disconnect: () => void;
}

const PolkadotContext = createContext<PolkadotContextType | null>(null);

const PolkadotProvider = ({ children }: { children: React.ReactNode }) => {
  const { wallets } = useWallets();

  const [accounts, setAccounts] = useState<Account[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [selectedWalletProvider, setSelectedWalletProvider] = useState<
    BaseWallet | undefined
  >();
  const [api, setApi] = useState<ApiPromise | undefined>();

  const keyring = useRef<Keyring>(new Keyring());

  const saveSelectedAccount = useCallback(
    async (account: Account) => {
      if (account !== selectedAccount) {
        if (selectedWalletProvider) {
          localStorage.setItem(
            POLKADOT_SOURCE,
            selectedWalletProvider.metadata.id,
          );
        }

        localStorage.setItem(POLKADOT_ACCOUNT, JSON.stringify(account));
        setSelectedAccount(account);
      }
    },
    [selectedAccount, selectedWalletProvider],
  );

  const connect = useCallback(async (walletProvider: BaseWallet) => {
    try {
      await walletProvider.connect();

      if (walletProvider.metadata.id === 'polkadot-js') {
        if (walletProvider.signer) {
          setSelectedWalletProvider(walletProvider);
        } else {
          window.location.reload();
        }
      } else {
        setSelectedWalletProvider(walletProvider);
      }
    } catch (err) {
      showErrorNotify('Connection failed', true);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (selectedWalletProvider?.isConnected) {
      selectedWalletProvider?.disconnect();
    }

    setSelectedWalletProvider(undefined);
    setSelectedAccount(undefined);

    localStorage.removeItem(POLKADOT_ACCOUNT);
    localStorage.removeItem(POLKADOT_SOURCE);
  }, [selectedWalletProvider]);

  useEffect(() => {
    async function autoLoginSavedAccount(baseWallets: BaseWallet[]) {
      const source = localStorage.getItem(POLKADOT_SOURCE);
      const provider = baseWallets.find(bw => bw.metadata.id === source);

      if (provider) {
        await connect(provider);
      }
    }

    async function setupApi() {
      const provider = new WsProvider(import.meta.env.VITE_SORA_PROVIDER);

      const soraOptions = options({ provider, noInitWarn: true });
      const apiOptions = new (soraOptions.constructor as {
        new (): ApiOptions;
      })();

      Object.assign(apiOptions, soraOptions);

      const soraAPI = new ApiPromise(apiOptions);

      await soraAPI.isReady;
      setApi(soraAPI);
    }

    async function init(wallets: BaseWallet[]) {
      await autoLoginSavedAccount(wallets);
      await setupApi();
      setLoading(false);
    }

    if (wallets) {
      init(wallets);
    }
  }, [wallets, connect]);

  useEffect(() => {
    if (!selectedWalletProvider) {
      setAccounts([]);
      return () => {};
    }

    const promUnsubscribe = selectedWalletProvider.subscribeAccounts(
      (accs: Account[]) => {
        const accountJSON = localStorage.getItem(POLKADOT_ACCOUNT);
        const acc = accountJSON ? (JSON.parse(accountJSON) as Account) : null;

        if (accs.length > 0) {
          setAccounts(accs);

          if (acc) {
            saveSelectedAccount(acc);
          } else if (accs.length === 1) {
            saveSelectedAccount(accs[0]);
          }
        } else {
          showErrorNotify('Connection failed', true);
          disconnect();
        }
      },
    );

    return () => {
      promUnsubscribe.then(unsub => unsub());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWalletProvider, disconnect]);

  return (
    <PolkadotContext.Provider
      value={{
        api,
        keyring: keyring.current,
        loading,
        accounts,
        selectedWalletProvider,
        selectedAccount,
        saveSelectedAccount,
        wallets,
        connect,
        disconnect,
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
