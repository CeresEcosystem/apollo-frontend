import { APOLLO_ADDRESS, TOAST_ID, XOR_ADDRESS } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { parse } from '@utils/helpers';
import { showErrorNotify } from '@utils/toast';
import { useCallback } from 'react';

const useBalance = () => {
  const { selectedAccount, api } = usePolkadot();

  const getBalance = useCallback(async () => {
    if (selectedAccount) {
      const balance = await api?.rpc.assets.freeBalance(
        selectedAccount?.address,
        APOLLO_ADDRESS,
      );

      // @ts-expect-error Property 'balance' does not exist on type 'string'.
      return parse(balance?.toHuman()?.balance);
    }

    showErrorNotify('Please connect your wallet first.', true, TOAST_ID);
  }, [api, selectedAccount]);

  const getBalanceForToken = useCallback(
    async (tokenAddress: string) => {
      if (selectedAccount) {
        let balance;

        if (tokenAddress === XOR_ADDRESS) {
          balance = await api?.rpc.assets.usableBalance(
            selectedAccount?.address,
            tokenAddress,
          );
        } else {
          balance = await api?.rpc.assets.freeBalance(
            selectedAccount?.address,
            tokenAddress,
          );
        }

        // @ts-expect-error Property 'balance' does not exist on type 'string'.
        return parse(balance?.toHuman()?.balance);
      }

      return 0;
    },
    [api, selectedAccount],
  );

  return { getBalance, getBalanceForToken };
};

export default useBalance;
