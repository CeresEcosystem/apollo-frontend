import Borrowing from '@components/borrowing';
import Stats from '@components/heading/stats';
import Lending from '@components/lending';
import PageContainer from '@components/page_container/page_container';
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
    <PageContainer>
      <Stats forWallet />
      <Lending />
      <Borrowing />
    </PageContainer>
  );
}

Component.displayName = 'Dashboard';
