import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

interface ApolloClaimContextType {
  totalClaimed: string | null;
  fetchTotalClaim: () => void;
}

const ApolloClaimContext = createContext<ApolloClaimContextType | null>(null);

const totalApollo = 100000;

const ApolloClaimProvider = ({ children }: { children: React.ReactNode }) => {
  const intl = useIntl();

  const [totalClaimed, setTotalClaimed] = useState<string | null>(null);

  const fetchTotalClaim = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airdrop/total-claimed`,
    );

    if (response.ok) {
      const json = await response.json();
      const tClaimed = intl.formatNumber(json.totalClaimed, {
        maximumFractionDigits: 2,
      });
      const percentage = intl.formatNumber(
        (json.totalClaimed / totalApollo) * 100,
        { maximumFractionDigits: 2 },
      );

      setTotalClaimed(
        `${tClaimed}/${intl.formatNumber(totalApollo, {
          maximumFractionDigits: 2,
        })} (${percentage}%)`,
      );
    }
  }, [intl]);

  useEffect(() => {
    fetchTotalClaim();
  }, [fetchTotalClaim]);

  return (
    <ApolloClaimContext.Provider
      value={{
        totalClaimed,
        fetchTotalClaim,
      }}
    >
      {children}
    </ApolloClaimContext.Provider>
  );
};

export default ApolloClaimProvider;

export const useApolloClaim = (): ApolloClaimContextType => {
  const contextValue = useContext(ApolloClaimContext);
  if (!contextValue) {
    throw new Error(
      'useApolloClaim must be used within a ApolloClaimContextProvider',
    );
  }
  return contextValue;
};
