import Clipboard from '@components/clipboard';
import Gradient from '@components/gradient';
import Modal from '@components/modal';
import { usePolkadot } from '@context/polkadot_context';
import { Account, BaseWallet } from '@polkadot-onboard/core';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  formatWalletAddress,
  getAvatarTitle,
  getEncodedAddress,
} from '@utils/helpers';
import classNames from 'classnames';

function AccountItem({
  account,
  closeModal,
  selected = false,
}: {
  account: Account;
  closeModal: () => void;
  selected?: boolean;
}) {
  const { keyring, saveSelectedAccount } = usePolkadot();

  const encodedAddress = getEncodedAddress(keyring, account.address);

  return (
    <div
      className={classNames(
        'bg-backgroundBody rounded-3xl border-2 flex flex-shrink-0 items-center overflow-hidden p-2 xxs:p-4',
        selected
          ? 'border-border'
          : 'cursor-pointer border-transparent hover:border-border',
      )}
      onClick={() => {
        if (!selected) {
          saveSelectedAccount(account);
          closeModal();
        }
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
          src="/walletconnect.webp"
          alt="walletconnect"
          className="h-8 w-8 rounded-full overflow-hidden xxs:h-10 xxs:w-10"
        />
      )}
      {account.name ? (
        <div className="px-3 flex-1 overflow-hidden">
          <p className={'truncate font-medium text-grey text-sm xxs:text-base'}>
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
}

function Accounts({ closeModal }: { closeModal: () => void }) {
  const {
    accounts,
    selectedAccount,
    selectedWalletProvider,
    wallets,
    connect,
    disconnect,
  } = usePolkadot();

  if (selectedAccount) {
    return (
      <div className="flex flex-col gap-y-2">
        <span className="text-grey">Selected account</span>
        <AccountItem
          account={selectedAccount}
          closeModal={closeModal}
          selected
        />
        <button
          onClick={() => disconnect()}
          className="outline-none border-2 border-pinkButton mt-10 w-full rounded-3xl p-1 text-center"
        >
          <span className="font-medium text-sm text-pinkButton">
            Disconnect account
          </span>
        </button>
      </div>
    );
  }

  if (selectedWalletProvider && accounts && accounts?.length > 0) {
    return (
      <>
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-x-1 outline-none"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-xs text-grey font-medium">Back</span>
        </button>
        <span className="text-grey text-sm block mt-4">
          Select account to work with
        </span>
        <div className="mt-4 max-h-96 overflow-x-hidden overflow-y-auto flex flex-col gap-y-1">
          {accounts.map(account => (
            <AccountItem
              key={account.address}
              account={account}
              closeModal={closeModal}
            />
          ))}
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
            {wallet.metadata.description && (
              <span className="font-medium text-grey text-sm xxs:text-base">
                {wallet.metadata.description}
              </span>
            )}
          </div>
        ))}
    </div>
  );
}

export default function WalletModal() {
  const { showWalletModal, setShowWalletModal } = usePolkadot();

  const closeModal = () => setShowWalletModal(false);

  return (
    <Modal
      title={'SORA Network Account'}
      showModal={showWalletModal}
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
