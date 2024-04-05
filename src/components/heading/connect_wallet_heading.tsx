import { usePolkadot } from '@context/polkadot_context';

export default function ConnectWalletHeading() {
  const { selectedAccount, setShowWalletModal } = usePolkadot();

  const renderContent = () => {
    return (
      <>
        <h1 className="text-white text-center font-medium text-sm xxs:text-lg sm:text-xl lg:text-2xl 2xl:text-4xl">
          Please, connect your wallet
        </h1>
        <button
          onClick={() => setShowWalletModal(true)}
          className="py-1 xxs:py-2 px-4 border-2 rounded-3xl border-pinkBorder outline-none lg:py-3 lg:px-8"
        >
          <span className="font-semibold text-white text-xs xxs:text-sm lg:text-base xl:text-lg">
            Connect wallet
          </span>
        </button>
      </>
    );
  };

  if (!selectedAccount) {
    return (
      <>
        <div className="bg-grey rounded-2xl flex flex-col justify-center items-center p-4 xxs:p-6 gap-y-2 xxs:gap-y-4 md:hidden">
          {renderContent()}
        </div>
        <div className="hidden bg-[url('/wallet_connect_heading.webp')] bg-contain bg-no-repeat w-full aspect-[6.24] md:flex flex-col justify-center items-center gap-y-4 xl:gap-y-6">
          {renderContent()}
        </div>
      </>
    );
  }

  return null;
}
