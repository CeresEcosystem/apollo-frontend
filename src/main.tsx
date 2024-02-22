import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import PolkadotProvider from '@context/polkadot_context.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@pages/error/index.tsx';
import ClaimPage from '@pages/claim/index.tsx';
import PrivacyPolicy from '@pages/privacy_policy/index.tsx';
import TermsOfUse from '@pages/terms_of_use/index.tsx';
import { IntlProvider } from 'react-intl';
import ApolloClaimProvider from '@context/apollo_claim_context.tsx';
import { WalletConnectConfiguration } from '@polkadot-onboard/wallet-connect';
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react';
import { WalletAggregator } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import { WalletConnectProvider } from '@polkadot-onboard/wallet-connect';
import { APP_NAME } from '@constants/index.ts';
import { extensionConfig } from '@utils/extension_config.ts';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ClaimPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms-of-use',
        element: <TermsOfUse />,
      },
    ],
  },
]);

const injectedWalletProvider = new InjectedWalletProvider(
  extensionConfig,
  APP_NAME,
);
const walletConnectParams: WalletConnectConfiguration = {
  projectId: 'a12ce363e0a7d3861a26612983d6fe55',
  relayUrl: 'wss://relay.walletconnect.com',
  metadata: {
    name: APP_NAME,
    description:
      'The Apollo Protocol is the first lending and borrowing platform on the SORA network and a part of the Ceres ecosystem. Apollo enables its users to deposit and borrow assets on the SORA network. Depositors can provide liquidity and secure passive income through interest, while borrowers can leverage their assets without selling them and pay interest for this service.',
    url: 'https://apolloprotocol.io/',
    icons: ['/walletconnect.png'],
  },
  chainIds: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
  optionalChainIds: [
    'polkadot:67f9723393ef76214df0118c34bbbd3d',
    'polkadot:7c34d42fc815d392057c78b49f2755c7',
  ],
};
const walletConnectProvider = new WalletConnectProvider(
  walletConnectParams,
  APP_NAME,
);
const walletAggregator = new WalletAggregator([
  injectedWalletProvider,
  walletConnectProvider,
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
        <ApolloClaimProvider>
          <PolkadotProvider>
            <RouterProvider router={router} />
          </PolkadotProvider>
        </ApolloClaimProvider>
      </PolkadotWalletsContextProvider>
    </IntlProvider>
  </React.StrictMode>,
);
