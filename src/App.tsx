import Footer from '@components/footer';
import Header from '@components/header';
import PageLoader from '@components/loader/page_loader';
import WalletModal from '@components/wallet/wallet_modal';
import { usePolkadot } from '@context/polkadot_context';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { useDisclaimer, useDisclaimerModal, useTokenPrice } from './store';
import { useEffect } from 'react';
import DisclaimerModal from '@components/disclaimer/disclaimer_modal';

export default function App() {
  const { loading } = usePolkadot();

  const fetchApolloPrice = useTokenPrice(state => state.init);

  const { isDisclaimerRead } = useDisclaimer(state => state);

  const { openDisclaimerModal } = useDisclaimerModal(state => state);

  useEffect(() => {
    fetchApolloPrice();
  }, [fetchApolloPrice]);

  useEffect(() => {
    if (!isDisclaimerRead) {
      setTimeout(() => {
        openDisclaimerModal();
      }, 2000);
    }
  }, [isDisclaimerRead, openDisclaimerModal]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Outlet />
        <Footer />
        <WalletModal />
        <DisclaimerModal />
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
