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

        await repayExtrinsic
          ?.signAndSend(
            selectedAccount!.address,
            { signer: selectedWalletProvider.signer },
            ({ status, events }) => {
              if (status?.isInBlock) {
                events
                  .filter(({ event }) =>
                    api?.events?.system?.ExtrinsicFailed?.is(event),
                  )
                  .forEach(
                    ({
                      event: {
                        data: [error],
                      },
                    }) => {
                      // @ts-expect-error Property 'isModule' does not exist on type 'Codec'.
                      if (error.isModule) {
                        const decoded = api.registry.findMetaError(
                          // @ts-expect-error Property 'isModule' does not exist on type 'Codec'.
                          error.asModule,
                        );

                        updateNotify(
                          toastId,
                          `Transaction failed : ${decoded.docs[0]}`,
                          'error',
                        );
                      } else {
                        updateNotify(
                          toastId,
                          `Transaction failed : ${error}`,
                          'error',
                        );
                      }

                      setLoading(false);
                    },
                  );

                updateNotify(toastId, `Successfully repay`, 'success');
                setLoading(false);
                onSuccessCallback();
              }
            },
          )
          .catch(error => {
            setLoading(false);
            updateNotify(toastId, `Transaction failed : ${error}`, 'error');
          });
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  return { loading, repayAsset };
};

export default useRepayAsset;
