import Footer from '@components/footer';
import Header from '@components/header';
import PageLoader from '@components/loader/page_loader';
import WalletModal from '@components/wallet/wallet_modal';
import { usePolkadot } from '@context/polkadot_context';
import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

export default function App() {
  const { loading } = usePolkadot();

  const [showWalletModal, setShowWalletModal] = useState(false);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header showWalletModal={() => setShowWalletModal(true)} />
        <WalletModal
          showModal={showWalletModal}
          closeModal={() => setShowWalletModal(false)}
        />
        <Outlet />
        <Footer />
      </div>
      <ToastContainer
        limit={3}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="light"
        draggable={false}
        transition={Zoom}
      />
      <ScrollRestoration />
    </>
  );
}
