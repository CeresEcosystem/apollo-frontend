import { API_URL } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { useEffect, useState } from 'react';
import { getEncodedAddress } from '@utils/helpers';
import { Keyring } from '@polkadot/api';
import { ClaimableAccount } from 'src/interfaces';

const useClaim = () => {
  const { selectedAccount, keyring } = usePolkadot();

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

    if (selectedAccount) {
      checkIfClaimable(selectedAccount.address, keyring);
    } else {
      setClaimableAccount(null);
      setLoading(false);
    }
  }, [selectedAccount, keyring]);

  return { loading, claimableAccount };
};

export default useClaim;
