import { useQuery } from '@tanstack/react-query';
import { MarketsData } from 'src/interfaces';

const useMarkets = () => {
  const { isLoading, error, data } = useQuery<MarketsData>({
    queryKey: ['marketsData'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/protocol`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const marketsData = (await response.json()) as MarketsData;

      return {
        pools: marketsData.pools.filter(pool => !pool.isRemoved),
        stats: marketsData.stats,
      };
    },
  });

  return {
    isLoading: isLoading || error || !data,
    data,
  };
};

export default useMarkets;
