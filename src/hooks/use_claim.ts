import { API_URL } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { useEffect, useState } from 'react';
import { getEncodedAddress } from '@utils/helpers';
import { Keyring } from '@polkadot/api';
import { ClaimableAccount } from 'src/interfaces';

const useClaim = () => {
  const polkadot = usePolkadot();

  const [loading, setLoading] = useState(false);

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

    if (polkadot?.selectedAccount && polkadot?.keyring) {
      checkIfClaimable(polkadot.selectedAccount.address, polkadot.keyring);
    } else {
      setClaimableAccount(null);
      setLoading(false);
    }
  }, [polkadot]);

  return { loading, claimableAccount };
};

export default useClaim;
