import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import PolkadotProvider from '@context/polkadot_context.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { walletAggregator } from '@utils/wallet_connect.ts';
import ReactGA from 'react-ga4';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ErrorPage from '@pages/error/index.tsx';

ReactGA.initialize('G-JYW28NEEEN');

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        lazy: () => import('@pages/markets/index.tsx'),
      },
      {
        path: 'dashboard',
        lazy: () => import('@pages/dashboard/index.tsx'),
      },
      {
        path: '/governance',
        lazy: () => import('@pages/governance/index.tsx'),
        children: [
          {
            path: '/governance/:pollId',
            lazy: () => import('@pages/governance_poll/index.tsx'),
          },
        ],
      },
      {
        path: '/privacy-policy',
        lazy: () => import('@pages/privacy_policy/index.tsx'),
      },
      {
        path: '/terms-of-use',
        lazy: () => import('@pages/terms_of_use/index.tsx'),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
          <PolkadotProvider>
            <RouterProvider router={router} />
          </PolkadotProvider>
        </PolkadotWalletsContextProvider>
      </QueryClientProvider>
    </IntlProvider>
  </React.StrictMode>,
);
