import { APP_NAME, POLKADOT_ACCOUNT } from '@constants/index';
import { Keyring } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PolkadotContextType {
  keyring: Keyring;
  loading: boolean;
  accounts: InjectedAccountWithMeta[] | null;
  selectedAccount: InjectedAccountWithMeta | null;
  saveSelectedAccount: (account: InjectedAccountWithMeta) => void;
}

const PolkadotContext = createContext<PolkadotContextType | null>(null);

const PolkadotProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | null>(
    null,
  );
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta | null>(null);

  const keyring = useRef<Keyring>(new Keyring());

  const saveSelectedAccount = useCallback(
    async (account: InjectedAccountWithMeta) => {
      if (account !== selectedAccount) {
        const acc = account as InjectedAccountWithMeta;
        localStorage.setItem(POLKADOT_ACCOUNT, JSON.stringify(account));
        setSelectedAccount(acc);
      }
    },
    [selectedAccount],
  );

  const connectToPolkadotExtension = useCallback(async () => {
    const accountJSON = localStorage.getItem(POLKADOT_ACCOUNT);
    const account = accountJSON ? JSON.parse(accountJSON) : null;

    const extensions = await web3Enable(APP_NAME);

    if (extensions.length !== 0) {
      const allAccounts = await web3Accounts();

      if (allAccounts !== null) {
        if (allAccounts.length > 0) {
          setAccounts(allAccounts);

          if (account !== null) {
            const accountsFiltered = allAccounts.filter(
              acc => acc?.meta?.name === account?.meta?.name,
            );
            if (accountsFiltered.length > 0) {
              setSelectedAccount(account);
            }
          }
        } else {
          setAccounts([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    async function init() {
      await connectToPolkadotExtension();
      setLoading(false);
    }

    init();
  }, [connectToPolkadotExtension]);

  return (
    <PolkadotContext.Provider
      value={{
        keyring: keyring.current,
        loading,
        accounts,
        selectedAccount,
        saveSelectedAccount,
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
