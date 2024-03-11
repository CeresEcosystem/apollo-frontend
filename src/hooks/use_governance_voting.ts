import { TOAST_ID } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { FPNumber } from '@utils/FPNumber';
import { getEncodedAddress } from '@utils/helpers';
import { showErrorNotify, showSuccessNotify } from '@utils/toast';
import { useCallback, useState } from 'react';
import { GovernancePollDetails } from 'src/interfaces';

const useGovernanceVoting = (poll: GovernancePollDetails) => {
  const { keyring, selectedAccount, api, selectedWalletProvider } =
    usePolkadot();

  const [loading, setLoading] = useState(false);

  const hasVoted = useCallback(() => {
    if (selectedAccount) {
      const selectedAddress = getEncodedAddress(
        keyring,
        selectedAccount?.address,
      );
      return (
        poll?.voters?.find(vote => vote.accountId === selectedAddress) ?? false
      );
    }

    return false;
  }, [keyring, poll?.voters, selectedAccount]);

  const vote = useCallback(
    async (
      pollId: string,
      amount: string,
      option: number,
      reload: () => void,
    ) => {
      if (api && selectedWalletProvider) {
        setLoading(true);

        const voteExtrinsic = api?.tx.ceresGovernancePlatform.vote(
          pollId,
          option,
          FPNumber.fromNatural(amount).bnToString(),
        );

        await voteExtrinsic
          ?.signAndSend(
            selectedAccount!.address,
            { signer: selectedWalletProvider.signer },
            async ({ status, events }) => {
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

                        showErrorNotify(
                          `Transaction failed : ${decoded.docs[0]}`,
                          true,
                          TOAST_ID,
                        );
                      } else {
                        showErrorNotify(
                          `Transaction failed : ${error}`,
                          true,
                          TOAST_ID,
                        );
                      }

                      setLoading(false);
                    },
                  );

                showSuccessNotify(`Voted successfully`, TOAST_ID);
                setLoading(false);
                reload();
              }
            },
          )
          .catch(error => {
            setLoading(false);
            showErrorNotify(`Transaction failed : ${error}`, true, TOAST_ID);
          });
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  const withdraw = useCallback(
    async (pollId: string, reload: () => void) => {
      if (api && selectedWalletProvider) {
        setLoading(true);

        const withdrawExtrinsic =
          api.tx.ceresGovernancePlatform.withdraw(pollId);

        await withdrawExtrinsic
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

                        showErrorNotify(
                          `Transaction failed : ${decoded.docs[0]}`,
                          true,
                          TOAST_ID,
                        );
                      } else {
                        showErrorNotify(
                          `Transaction failed : ${error}`,
                          true,
                          TOAST_ID,
                        );
                      }

                      setLoading(false);
                    },
                  );

                showSuccessNotify(`Funds withdrawn successfully`, TOAST_ID);
                setLoading(false);
                reload();
              }
            },
          )
          .catch(error => {
            setLoading(false);
            showErrorNotify(`Transaction failed : ${error}`, true, TOAST_ID);
          });
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  return { hasVoted, vote, withdraw, loading };
};

export default useGovernanceVoting;
