import ConnectWalletHeading from '@components/heading/connect_wallet_heading';
import Stats from '@components/heading/stats';
import MarketPools from '@components/market_pools';
import PageContainer from '@components/page_container/page_container';
import useMarkets from '@hooks/use_markets';
import Loader from './loader';

export function Component() {
  const { data, isLoading } = useMarkets();

  if (isLoading) return <Loader />;

  return (
    <PageContainer>
      <ConnectWalletHeading />
      <Stats data={data!.stats} />
      <MarketPools pools={data!.pools} />
    </PageContainer>
  );
}

Component.displayName = 'Markets';
