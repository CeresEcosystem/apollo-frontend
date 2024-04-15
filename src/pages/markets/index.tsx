import ConnectWalletHeading from '@components/heading/connect_wallet_heading';
import Stats from '@components/heading/stats';
import MarketAssets from '@components/market_assets';
import PageContainer from '@components/page_container/page_container';

export function Component() {
  return (
    <PageContainer>
      <ConnectWalletHeading />
      <Stats />
      <MarketAssets />
    </PageContainer>
  );
}

Component.displayName = 'Markets';
