import { API_URL } from '@constants/index';
import { useQuery } from '@tanstack/react-query';
import { MarketsData } from 'src/interfaces';

const useMarkets = () => {
  const { isLoading, error, data } = useQuery<MarketsData>({
    queryKey: ['marketsData'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/protocol`);

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    },
  });

  return {
    isLoading: isLoading || error || !data,
    data,
  };
};

export default useMarkets;
