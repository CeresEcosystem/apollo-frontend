import Borrowing from '@components/borrowing';
import Stats from '@components/heading/stats';
import Lending from '@components/lending';
import PageContainer from '@components/page_container/page_container';
import { TOAST_ID, WALLET_NOT_CONNECTED } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import useDashboard from '@hooks/use_dashboard';
import { showErrorNotify } from '@utils/toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

function Dashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <Loader />;

  return (
    <PageContainer>
      <Stats statsData={data!.userData} forWallet />
      <Lending lendingInfo={data!.lendingInfo} />
      <Borrowing borrowingInfo={data!.borrowingInfo} />
    </PageContainer>
  );
}

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

  return <Dashboard />;
}

Component.displayName = 'Dashboard';
