import { APP_NAME } from '@constants/index';
import { WalletAggregator } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import {
  WalletConnectConfiguration,
  WalletConnectProvider,
} from '@polkadot-onboard/wallet-connect';

const walletConnectParams: WalletConnectConfiguration = {
  projectId: 'a12ce363e0a7d3861a26612983d6fe55',
  relayUrl: 'wss://relay.walletconnect.com',
  metadata: {
    name: APP_NAME,
    description: 'WalletConnect',
    url: 'https://apolloprotocol.io/',
    icons: ['/walletconnect.png'],
  },
  chainIds: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
  optionalChainIds: ['polkadot:91b171bb158e2d3848fa23a9f1c25182'],
};

const injectedWalletProvider = new InjectedWalletProvider(
  {
    disallowed: [],
    supported: [
      {
        id: 'polkadot-js',
        title: 'Polkadot{.js}',
        description: 'Polkadot-js',
        iconUrl: '/polkadotjs.svg',
        urls: {
          main: '',
          browsers: {
            chrome:
              'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd',
            firefox:
              'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/',
          },
        },
      },
      {
        id: 'fearless-wallet',
        title: 'Fearless Wallet',
        description: 'Fearless Wallet',
        iconUrl: '/fearless.svg',
        urls: {
          main: '',
          browsers: {
            chrome:
              'https://chromewebstore.google.com/detail/fearless-wallet/nhlnehondigmgckngjomcpcefcdplmgc',
          },
        },
      },
    ],
  },
  APP_NAME,
);

const walletConnectProvider = new WalletConnectProvider(
  walletConnectParams,
  APP_NAME,
);

export const walletAggregator = new WalletAggregator([
  injectedWalletProvider,
  walletConnectProvider,
]);
