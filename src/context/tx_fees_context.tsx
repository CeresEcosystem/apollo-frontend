import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FEE_TYPES, FeeDto } from 'src/interfaces';

interface TxFeesContextType {
  getFee: (type: FEE_TYPES) => number;
}

const TxFeesContext = createContext<TxFeesContextType | null>(null);

const TxFeesProvider = ({ children }: { children: React.ReactNode }) => {
  const [fees, setFees] = useState<FeeDto[]>([]);

  const getFee = useCallback(
    (type: FEE_TYPES): number => {
      return fees.find(fee => fee.type === type)?.fee || 0;
    },
    [fees],
  );

  const fetchFees = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fees`);

    if (response.ok) {
      const json = (await response.json()) as FeeDto[];
      setFees(json);
    }
  }, []);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  return (
    <TxFeesContext.Provider
      value={{
        getFee,
      }}
    >
      {children}
    </TxFeesContext.Provider>
  );
};

export default TxFeesProvider;

export const useTxFees = (): TxFeesContextType => {
  const contextValue = useContext(TxFeesContext);
  if (!contextValue) {
    throw new Error('useTxFees must be used within a TxFeesProvider');
  }
  return contextValue;
};
