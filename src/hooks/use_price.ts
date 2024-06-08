import { useCallback } from 'react';
import { useTokenPrice } from 'src/store';

const usePrice = () => {
  const prices = useTokenPrice(state => state.prices);

  const getPriceForToken = useCallback(
    (token: string) => {
      return (
        prices.find(p => p.assetId === token || p.token === token)?.price ?? 0
      );
    },
    [prices],
  );

  return { getPriceForToken };
};

export default usePrice;
