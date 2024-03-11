import { CERES_ADDRESS, TOAST_ID } from '@constants/index';
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
        CERES_ADDRESS,
      );

      // @ts-expect-error Property 'balance' does not exist on type 'string'.
      return parse(balance?.toHuman()?.balance);
    }

    showErrorNotify('Please connect your wallet first.', true, TOAST_ID);
  }, [api, selectedAccount]);

  return { getBalance };
};

export default useBalance;
