import Clipboard from '@components/clipboard';
import Gradient from '@components/gradient';
import Modal from '@components/modal';
import { APP_NAME } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { BaseWallet } from '@polkadot-onboard/core';
import {
  formatWalletAddress,
  getAvatarTitle,
  getEncodedAddress,
} from '@utils/helpers';

function Accounts({ closeModal }: { closeModal: () => void }) {
  const {
    accounts,
    selectedAccount,
    selectedWalletProvider,
    keyring,
    wallets,
    connect,
    setSelectedAccount,
  } = usePolkadot();

  if (selectedAccount) {
    return (
      <div>
        <span>Selected account</span>
      </div>
    );
  }

  if (selectedWalletProvider && accounts && accounts?.length > 0) {
    return (
      <>
        <span className="text-grey text-sm">Select account to work with</span>
        <div className="mt-4 max-h-96 overflow-x-hidden overflow-y-auto flex flex-col gap-y-1">
          {accounts.map(account => {
            const encodedAddress = getEncodedAddress(keyring, account.address);

            return (
              <div
                key={account.address}
                className="bg-backgroundBody rounded-3xl border-2 cursor-pointer flex items-center overflow-hidden p-2 xxs:p-4 border-transparent hover:border-border"
                onClick={() => {
                  setSelectedAccount(account);
                  closeModal();
                }}
              >
                {account.name ? (
                  <div className="h-8 w-8 rounded-full overflow-hidden xxs:h-10 xxs:w-10">
                    <Gradient>
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-sm text-white xxs:text-lg">
                          {getAvatarTitle(account?.name)}
                        </span>
                      </div>
                    </Gradient>
                  </div>
                ) : (
                  <img
                    src="/walletconnect.png"
                    alt="walletconnect"
                    className="h-8 w-8 rounded-full overflow-hidden xxs:h-10 xxs:w-10"
                  />
                )}
                {account.name ? (
                  <div className="px-3 flex-1 overflow-hidden">
                    <p
                      className={
                        'truncate font-medium text-grey text-sm xxs:text-base'
                      }
                    >
                      {account.name}
                    </p>
                    <Clipboard text={encodedAddress}>
                      <p className="text-xs text-grey2 truncate hover:underline">
                        {formatWalletAddress(encodedAddress, 12)}
                      </p>
                    </Clipboard>
                  </div>
                ) : (
                  <Clipboard text={encodedAddress}>
                    <p className="px-3 text-xs text-grey font-medium truncate hover:underline">
                      {formatWalletAddress(encodedAddress, 12)}
                    </p>
                  </Clipboard>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      {wallets &&
        wallets.map((wallet: BaseWallet) => (
          <div
            key={wallet.metadata.title}
            onClick={() => connect(wallet)}
            className="bg-backgroundBody rounded-3xl border-2 cursor-pointer flex gap-x-4 items-center overflow-hidden p-2 xxs:p-4 border-transparent hover:border-border"
          >
            <img
              src={wallet.metadata.iconUrl}
              alt={wallet.metadata.title}
              className="h-10 sm:h-14"
            />
            <span className="font-medium text-grey text-sm xxs:text-base">
              {wallet.metadata.title === APP_NAME
                ? 'WalletConnect'
                : wallet.metadata.title}
            </span>
          </div>
        ))}
    </div>
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
