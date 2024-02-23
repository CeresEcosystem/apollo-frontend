import { API_URL } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { useCallback, useEffect, useState } from 'react';
import { getEncodedAddress } from '@utils/helpers';
import { Keyring } from '@polkadot/api';
import { ClaimableAccount } from 'src/interfaces';
import { showErrorNotify, showLoadingNotify, updateNotify } from '@utils/toast';
import { useApolloClaim } from '@context/apollo_claim_context';

const useClaim = () => {
  const { selectedAccount, keyring, selectedWalletProvider } = usePolkadot();
  const { fetchTotalClaim } = useApolloClaim();

  const [loading, setLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  const [claimableAccount, setClaimableAccount] =
    useState<ClaimableAccount | null>(null);

  useEffect(() => {
    async function checkIfClaimable(account: string, keyring: Keyring) {
      setLoading(true);

      const encodedAccount = getEncodedAddress(keyring, account);

      try {
        const response = await fetch(
          `${API_URL}/airdrop/claimable/${encodedAccount}`,
        );

        if (response.ok) {
          const acc = (await response.json()) as ClaimableAccount;
          setClaimableAccount(acc);
        }

        setLoading(false);
      } catch (e) {
        setClaimableAccount({
          accountId: encodedAccount,
          balance: 0,
          hasClaimed: true,
        });
        setLoading(false);
      }
    }

    if (selectedAccount) {
      checkIfClaimable(selectedAccount.address, keyring);
    } else {
      setClaimableAccount(null);
      setLoading(false);
    }
  }, [selectedAccount, keyring]);

  const claimApollo = useCallback(async () => {
    if (selectedAccount) {
      setClaimLoading(true);
      const toastID = showLoadingNotify();

      const message = 'Claim Apollo airdrop';

      let signature;

      try {
        const signRaw = selectedWalletProvider?.signer?.signRaw;

        if (signRaw) {
          const signerResult = await signRaw({
            address: selectedAccount.address,
            data: message,
            type: 'bytes',
          });
          signature = signerResult.signature;
        }
      } catch (err) {
        console.error(err);
      }

      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: getEncodedAddress(keyring, selectedAccount.address),
          signature: signature,
        }),
      };

      const response = await fetch(`${API_URL}/airdrop/claim`, config);

      if (response.ok) {
        updateNotify(toastID, 'Apollo successfully claimed', 'success');
        fetchTotalClaim();

        if (claimableAccount) {
          setClaimableAccount(prevAccount => {
            if (prevAccount !== null) {
              return {
                ...prevAccount,
                hasClaimed: true,
              };
            } else {
              return null;
            }
          });
        }

        setClaimLoading(false);
      } else {
        updateNotify(toastID, 'Apollo claiming failed.', 'error');
        setClaimLoading(false);
      }
    } else {
      showErrorNotify('Please, connect your wallet!');
    }
  }, [
    selectedAccount,
    keyring,
    claimableAccount,
    fetchTotalClaim,
    selectedWalletProvider,
  ]);

  return { loading, claimableAccount, claimApollo, claimLoading };
};

export default useClaim;
