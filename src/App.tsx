import Footer from '@components/footer';
import Header from '@components/header';
import PageLoader from '@components/loader/page_loader';
import WalletModal from '@components/wallet/wallet_modal';
import { usePolkadot } from '@context/polkadot_context';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { useTokenPrice } from './store';
import { useEffect } from 'react';

export default function App() {
  const { loading } = usePolkadot();
  const fetchApolloPrice = useTokenPrice(state => state.init);

  useEffect(() => {
    fetchApolloPrice();
  }, [fetchApolloPrice]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <WalletModal />
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
