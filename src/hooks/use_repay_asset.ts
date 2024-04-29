import { usePolkadot } from '@context/polkadot_context';
import { FPNumber } from '@utils/FPNumber';
import { showLoadingNotify, updateNotify } from '@utils/toast';
import { useCallback, useState } from 'react';

const useRepayAsset = () => {
  const { selectedAccount, api, selectedWalletProvider } = usePolkadot();

  const [loading, setLoading] = useState(false);

  const repayAsset = useCallback(
    async (
      collateralTokenAddress: string,
      tokenAddress: string,
      amount: string,
      onSuccessCallback: () => void,
    ) => {
      if (api && selectedWalletProvider) {
        setLoading(true);
        const toastId = showLoadingNotify();

        const repayExtrinsic = api.tx.apolloPlatform.repay(
          collateralTokenAddress,
          tokenAddress,
          FPNumber.fromNatural(amount).bnToString(),
        );

        const tx = new Promise<boolean>(resolve => {
          repayExtrinsic
            ?.signAndSend(
              selectedAccount!.address,
              { signer: selectedWalletProvider.signer },
              result => {
                (async () => {
                  if (result?.status?.isFinalized) {
                    const failedEvents = result.events.filter(({ event }) =>
                      api.events?.system?.ExtrinsicFailed?.is(event),
                    );
                    updateNotify(toastId, `Transaction failed`, 'error');
                    resolve(failedEvents.length === 0);
                  }
                })().catch(error => {
                  updateNotify(
                    toastId,
                    `Transaction failed - ${error}`,
                    'error',
                  );
                  resolve(false);
                });
              },
            )
            .catch(error => {
              updateNotify(toastId, `Transaction failed - ${error}`, 'error');
              resolve(false);
            });
        });

        const succeeded = await tx;

        setLoading(false);

        if (succeeded) {
          updateNotify(toastId, `Successfully repay`, 'success');
          onSuccessCallback();
        }
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  return { loading, repayAsset };
};

export default useRepayAsset;
