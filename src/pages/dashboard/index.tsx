import { TOAST_ID, WALLET_NOT_CONNECTED } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { showErrorNotify } from '@utils/toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Component() {
  const { selectedAccount } = usePolkadot();

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedAccount) {
      showErrorNotify(WALLET_NOT_CONNECTED, true, TOAST_ID);
      navigate('/', {
        replace: true,
      });
    }
  }, [selectedAccount, navigate]);

  return (
    <div>
      <span>Dashboard</span>
    </div>
  );
}

Component.displayName = 'Dashboard';
