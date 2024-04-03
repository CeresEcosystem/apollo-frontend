import ConnectWalletHeading from '@components/heading/connect_wallet_heading';
import Stats from '@components/heading/stats';
import PageContainer from '@components/page_container/page_container';

export default function Markets() {
  return (
    <PageContainer>
      <ConnectWalletHeading />
      <Stats />
    </PageContainer>
  );
}
