import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import PolkadotProvider from '@context/polkadot_context.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@pages/error/index.tsx';
import PrivacyPolicy from '@pages/privacy_policy/index.tsx';
import TermsOfUse from '@pages/terms_of_use/index.tsx';
import { IntlProvider } from 'react-intl';
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { walletAggregator } from '@utils/wallet_connect.ts';
import Governance from '@pages/governance/index.tsx';
import GovernancePoll from '@pages/governance_poll/index.tsx';
import Markets from '@pages/markets/index.tsx';
import Dashboard from '@pages/dashboard/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Markets />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/governance',
        element: <Governance />,
        children: [
          {
            path: '/governance/:pollId',
            element: <GovernancePoll />,
          },
        ],
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <PolkadotWalletsContextProvider
        walletAggregator={walletAggregator}
        initialWaitMs={2000}
      >
        <PolkadotProvider>
          <RouterProvider router={router} />
        </PolkadotProvider>
      </PolkadotWalletsContextProvider>
    </IntlProvider>
  </React.StrictMode>,
);
