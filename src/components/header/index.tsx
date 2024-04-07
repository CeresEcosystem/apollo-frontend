import Gradient from '@components/gradient';
import Overlay from '@components/overlay';
import { TOAST_ID, TOKEN_NAME, WALLET_NOT_CONNECTED } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  formatWalletAddress,
  getAvatarTitle,
  getEncodedAddress,
} from '@utils/helpers';
import { showErrorNotify } from '@utils/toast';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

const pages = [
  {
    title: 'Markets',
    link: '/',
    requestWalletConnected: false,
  },
  {
    title: 'Dashboard',
    link: '/dashboard',
    requestWalletConnected: true,
  },
  {
    title: 'Governance',
    link: '/governance',
    requestWalletConnected: false,
  },
];

function PageLinks() {
  const { pathname } = useLocation();

  const { selectedAccount } = usePolkadot();

  return (
    <ul
      role="list"
      className="absolute h-full left-1/2 -translate-x-1/2 hidden items-center gap-x-4 md:flex xl:gap-x-8"
    >
      {pages.map(page => {
        const active =
          page.link === '/'
            ? pathname === page.link
            : pathname.includes(page.link);

        return (
          <li
            key={page.link}
            className={classNames(
              'border-b-4 h-full flex items-center',
              active ? 'border-b-pinkLight' : 'border-b-transparent',
            )}
          >
            {!selectedAccount && page.requestWalletConnected ? (
              <button
                onClick={() =>
                  showErrorNotify(WALLET_NOT_CONNECTED, true, TOAST_ID)
                }
                className={classNames(
                  'font-medium px-2 text-sm xl:text-base outline-none hover:text-grey',
                  active ? 'text-grey' : 'text-grey2',
                )}
              >
                {page.title}
              </button>
            ) : (
              <Link
                to={page.link}
                className={classNames(
                  'font-medium px-2 text-sm xl:text-base hover:text-grey',
                  active ? 'text-grey' : 'text-grey2',
                )}
              >
                {page.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ConnectButton() {
  const { selectedAccount, keyring, setShowWalletModal } = usePolkadot();

  return (
    <div
      onClick={() => setShowWalletModal(true)}
      className="cursor-pointer rounded-3xl shadow-buttonShadow overflow-hidden max-w-60"
    >
      {selectedAccount ? (
        <div className="py-1 px-2 border-2 rounded-3xl border-border flex items-center gap-x-2 bg-backgroundBody xs:py-2 xl:px-4">
          {selectedAccount.name ? (
            <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
              <Gradient>
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-sm text-white">
                    {getAvatarTitle(selectedAccount.name)}
                  </span>
                </div>
              </Gradient>
            </div>
          ) : (
            <img
              src="/walletconnect.webp"
              alt="walletconnect"
              className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden xxs:h-10 xxs:w-10"
            />
          )}
          <span className="hidden font-semibold text-sm text-grey truncate xs:inline-block xs:text-base">
            {formatWalletAddress(
              getEncodedAddress(keyring, selectedAccount.address),
              5,
            )}
          </span>
        </div>
      ) : (
        <Gradient>
          <div className="py-3 px-4">
            <img src="/wallet.svg" alt="wallet" className="xs:hidden" />
            <span className="hidden font-semibold text-white text-base xs:block">
              Connect wallet
            </span>
          </div>
        </Gradient>
      )}
    </div>
  );
}

function ApolloPrice() {
  const { apolloPrice } = usePolkadot();

  return (
    <div className="rounded-3xl overflow-hidden hidden lg:block">
      <div className="py-1 px-2 border-2 rounded-3xl border-border flex items-center gap-x-2 bg-backgroundBody xs:py-2 xl:px-4">
        <div className="h-8 w-8 shadow-buttonShadow flex-shrink-0 rounded-full overflow-hidden">
          <img src="/logo_bg.webp" alt="logo" />
        </div>
        <span className="hidden font-semibold text-sm text-grey2 truncate xxs:inline-block xs:text-base">
          $<span className="text-grey pl-1">{apolloPrice ?? '0.00'}</span>
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();

  const { apolloPrice } = usePolkadot();

  return (
    <div id="header">
      <Popover className="relative">
        {({ open }) => (
          <>
            {open && <Overlay />}
            <div>
              <div className="bg-white h-20 px-5 xl:px-16">
                <div className="relative py-2 flex h-full mx-auto gap-x-2 items-center justify-between max-w-[1740px]">
                  <div className="h-full flex items-center gap-x-4">
                    <div className="md:hidden">
                      <Popover.Button className="focus:outline-none">
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon
                          className="h-6 w-6 xs:h-8 xs:w-8 text-grey"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                    </div>
                    <Link to="/" className="h-full flex items-center">
                      <img
                        src="/apollo.webp"
                        alt="logo"
                        className="h-4/5 xxs:hidden"
                      />
                      <img
                        src="/logo.webp"
                        alt="logo"
                        className="hidden xxs:block xxs:h-4/5 xs:h-full"
                      />
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-1 xl:gap-x-2">
                    <ApolloPrice />
                    <ConnectButton />
                  </div>
                  <PageLinks />
                </div>
              </div>
              <div className="bg-grey py-1 px-5 flex items-center justify-center lg:hidden">
                <span className="text-white text-center font-medium text-sm sm:text-base">{`${TOKEN_NAME.toUpperCase()} $${apolloPrice ?? '0.00'}`}</span>
              </div>
            </div>
            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 origin-top-right z-20 transform transition md:px-8 md:hidden"
              >
                {({ close }) => (
                  <div className="bg-white shadow-lg">
                    <div className="h-24 flex items-center justify-between pl-6 md:pl-14">
                      <Link
                        onClick={() => close()}
                        to="/"
                        className="outline-none"
                      >
                        <img src="/logo.webp" alt="logo" className="h-16" />
                      </Link>
                      <div className="mr-6 md:mr-14">
                        <button
                          onClick={() => close()}
                          className="text-grey focus:outline-none"
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="py-6 px-5">
                      <ul
                        role="list"
                        className="flex flex-col gap-y-4 xxs:justify-center xxs:flex-row xxs:gap-x-4 xs:gap-x-12 sm:gap-x-20"
                      >
                        {pages.map(page => {
                          const active = pathname === page.link;

                          return (
                            <li key={page.title} className="flex items-center">
                              {active && (
                                <hr className="w-4 border-pinkLight" />
                              )}
                              <Link to={page.link} onClick={() => close()}>
                                <span
                                  className={classNames(
                                    'font-medium text-base hover:text-grey',
                                    active ? 'text-grey pl-1' : 'text-grey2',
                                  )}
                                >
                                  {page.title}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
