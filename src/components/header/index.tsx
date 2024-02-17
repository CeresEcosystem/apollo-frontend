import Gradient from '@components/gradient';
import { useApolloClaim } from '@context/apollo_claim_context';
import { usePolkadot } from '@context/polkadot_context';
import { getAvatarTitle } from '@utils/helpers';
import { Link } from 'react-router-dom';

export default function Header({
  showWalletModal,
}: {
  showWalletModal: () => void;
}) {
  const { selectedAccount } = usePolkadot();
  const { totalClaimed } = useApolloClaim();

  return (
    <>
      <div className="bg-white h-20 flex gap-x-2 items-center py-2 justify-between px-5 md:px-16 lg:px-28">
        <Link to="/" className="h-full flex items-center">
          <img src="/logo.png" alt="logo" className="h-4/5 xs:h-full" />
        </Link>
        <div
          onClick={showWalletModal}
          className="cursor-pointer rounded-3xl overflow-hidden max-w-60"
        >
          {selectedAccount ? (
            <div className="py-1 px-2 border-2 rounded-3xl border-border flex items-center gap-x-2 bg-backgroundBody xs:py-2 xs:px-4">
              <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
                <Gradient>
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-sm text-white">
                      {getAvatarTitle(selectedAccount.meta.name)}
                    </span>
                  </div>
                </Gradient>
              </div>
              <span className="hidden font-semibold text-sm text-grey truncate xxs:inline-block xs:text-base">
                {selectedAccount.meta.name}
              </span>
            </div>
          ) : (
            <Gradient>
              <div className="py-3 px-4">
                <img src="/wallet.svg" alt="wallet" className="xxs:hidden" />
                <span className="hidden font-semibold text-white text-base xxs:block">
                  Connect wallet
                </span>
              </div>
            </Gradient>
          )}
        </div>
      </div>
      <div className="bg-grey h-8 px-5 flex items-center justify-center">
        <span className="text-white font-medium text-sm sm:text-base">{`Total APOLLO claimed: ${totalClaimed ?? '_'}`}</span>
      </div>
    </>
  );
}
