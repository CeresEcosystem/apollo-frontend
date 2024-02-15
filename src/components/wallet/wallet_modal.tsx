import Clipboard from '@components/clipboard';
import Gradient from '@components/gradient';
import Modal from '@components/modal';
import { POLKADOT_EXTENSION } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { formatWalletAddress, getAvatarTitle } from '@utils/helpers';
import classNames from 'classnames';

function Accounts({ closeModal }: { closeModal: () => void }) {
  const { accounts, selectedAccount, saveSelectedAccount } = usePolkadot();

  if (accounts) {
    if (accounts.length > 0) {
      return (
        <>
          <span className="text-grey text-sm">Select account to work with</span>
          <div className="mt-4 max-h-96 overflow-x-hidden overflow-y-auto flex flex-col gap-y-1">
            {accounts?.map(account => {
              const active = account.address === selectedAccount?.address;

              return (
                <div
                  key={account?.address}
                  className={classNames(
                    'bg-backgroundBody rounded-3xl border-2 cursor-pointer flex items-center overflow-hidden group p-2 xxs:p-4',
                    active
                      ? 'border-border'
                      : 'border-transparent hover:border-border',
                  )}
                  onClick={() => {
                    saveSelectedAccount(account);
                    closeModal();
                  }}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden xxs:h-10 xxs:w-10">
                    <Gradient>
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-sm text-white xxs:text-lg">
                          {getAvatarTitle(account?.meta?.name)}
                        </span>
                      </div>
                    </Gradient>
                  </div>
                  <div className="px-3 flex-1 overflow-hidden">
                    <p
                      className={
                        'truncate font-medium text-grey text-sm xxs:text-base'
                      }
                    >
                      {account?.meta?.name}
                    </p>
                    <Clipboard text={account?.address}>
                      <p className="text-xs text-grey2 truncate hover:underline">
                        {formatWalletAddress(account?.address, 12)}
                      </p>
                    </Clipboard>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }

    return (
      <>
        <p className="text-sm text-grey">
          You currently don't have any accounts. Create your first account using
          Polkadot JS extension.
        </p>
      </>
    );
  }

  return (
    <>
      <p className="text-sm text-grey">
        Please add wallet using Polkadot JS extension. If you don&apos;t have
        Polkadot JS extension installed, please click on this
        <a
          href={POLKADOT_EXTENSION}
          className="text-pinkLight cursor-pointer outline-none"
          target={'_blank'}
        >
          {' '}
          Link
        </a>
        .
      </p>
    </>
  );
}

export default function WalletModal({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal
      title={'SORA Network Account'}
      showModal={showModal}
      closeModal={closeModal}
    >
      <Accounts closeModal={closeModal} />
    </Modal>
  );
}

/* 
if (polkadot?.selectedAccount) {
      const address = getEncodedAddress(
        polkadot?.keyring,
        polkadot?.selectedAccount?.address,
      );

      return (
        <div className="overflow-hidden shadow-lg rounded-xl bg-backgroundHeader pt-5">
          <div className="px-5 flex flex-col">
            <div className="inline-flex items-center">
              <UserCircleIcon
                className={'h-8 w-auto mr-2'}
                aria-hidden="true"
                color="#f0398c"
              />
              <h1 className="text-white font-bold text-base w-full truncate">
                {polkadot?.selectedAccount?.meta?.name}
              </h1>
            </div>
            <span className="text-white font-semibold text-base mt-4">
              Your address
            </span>
            <div className="flex items-center">
              <Clipboard text={address}>
                <span className="text-white cursor-pointer font-medium text-sm text-opacity-50 hover:underline hover:text-opacity-100">
                  {formatWalletAddress(address, 10)}
                </span>
              </Clipboard>
            </div>
          </div>
          <div className="flex justify-center mt-10 mb-5">
            <button
              className="py-2 px-5 rounded-md bg-white bg-opacity-10 text-white font-bold text-base"
              onClick={() => polkadot?.disconnect()}
            >
              Disconnect
            </button>
          </div>
        </div>
      );
    }

*/
