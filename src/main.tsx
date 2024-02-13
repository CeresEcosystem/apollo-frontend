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
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <ApolloClaimProvider>
        <PolkadotProvider>
          <RouterProvider router={router} />
        </PolkadotProvider>
      </ApolloClaimProvider>
    </IntlProvider>
  </React.StrictMode>,
);
