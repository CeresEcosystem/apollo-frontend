import Header from '@components/header';
import PageLoader from '@components/loader/page_loader';
import WalletModal from '@components/wallet/wallet_modal';
import { usePolkadot } from '@context/polkadot_context';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  const polkadot = usePolkadot();

  const [showWalletModal, setShowWalletModal] = useState(false);

  if (polkadot?.loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Header showWalletModal={() => setShowWalletModal(true)} />
      <WalletModal
        showModal={showWalletModal}
        closeModal={() => setShowWalletModal(false)}
      />
      <Outlet />
      <span>Footer</span>
    </>
  );
}
