import { usePolkadot } from '@context/polkadot_context';
import { FPNumber } from '@utils/FPNumber';
import { getEncodedAddress } from '@utils/helpers';
import { showLoadingNotify, updateNotify } from '@utils/toast';
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
        const toastId = showLoadingNotify();

        const voteExtrinsic = api?.tx.ceresGovernancePlatform.vote(
          pollId,
          option,
          FPNumber.fromNatural(amount).bnToString(),
        );

        const tx = new Promise<boolean>(resolve => {
          voteExtrinsic
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
          reload();
          updateNotify(toastId, `Voted successfully`, 'success');
        }
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  const withdraw = useCallback(
    async (pollId: string, reload: () => void) => {
      if (api && selectedWalletProvider) {
        setLoading(true);
        const toastId = showLoadingNotify();

        const withdrawExtrinsic =
          api.tx.ceresGovernancePlatform.withdraw(pollId);

        const tx = new Promise<boolean>(resolve => {
          withdrawExtrinsic
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
          reload();
          updateNotify(toastId, `Funds withdrawn successfully`, 'success');
        }
      }
    },
    [api, selectedAccount, selectedWalletProvider],
  );

  return { hasVoted, vote, withdraw, loading };
};

export default useGovernanceVoting;
