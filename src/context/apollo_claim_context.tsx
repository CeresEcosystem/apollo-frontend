import { API_URL } from '@constants/index';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ApolloClaimContextType {
  totalClaimed: number | null;
  fetchTotalClaim: () => void;
}

const ApolloClaimContext = createContext<ApolloClaimContextType | null>(null);

const ApolloClaimProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalClaimed, setTotalClaimed] = useState<number | null>(null);

  const fetchTotalClaim = useCallback(async () => {
    const response = await fetch(`${API_URL}/airdrop/total-claimed`);

    if (response.ok) {
      const json = await response.json();
      setTotalClaimed(json.totalClaimed ?? 0);
    }
  }, []);

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

export const useApolloClaim = () => useContext(ApolloClaimContext);
