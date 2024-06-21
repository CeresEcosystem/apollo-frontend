import { usePolkadot } from '@context/polkadot_context';
import { FPNumber } from '@utils/FPNumber';
import { showLoadingNotify, updateNotify } from '@utils/toast';
import { useCallback, useState } from 'react';
import ReactGA from 'react-ga4';

const useBorrowAsset = () => {
  const { selectedAccount, api, selectedWalletProvider } = usePolkadot();

  const [loading, setLoading] = useState(false);

  const borrowAsset = useCallback(
    async (
      collateralAddress: string,
      tokenAddress: string,
      amount: string,
      ltv: number,
      onSuccessCallback: () => void,
    ) => {
      if (api && selectedWalletProvider) {
        setLoading(true);
        const toastId = showLoadingNotify();

        const borrowExtrinsic = api.tx.apolloPlatform.borrow(
          collateralAddress,
          tokenAddress,
          FPNumber.fromNatural(amount).bnToString(),
          FPNumber.fromNatural(ltv / 100).bnToString(),
        );

        const tx = new Promise<boolean>(resolve => {
          borrowExtrinsic
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
          updateNotify(toastId, `Successfully borrowed`, 'success');
          ReactGA.event({
            category: 'Borrowing',
            action: 'Borrow button clicked',
            label: `Borrow Asset - ${tokenAddress}, collateral - ${collateralAddress}`,
            value: Number(amount),
          });
          onSuccessCallback();
        }
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  return { loading, borrowAsset };
};

export default useBorrowAsset;
