import Gradient from '@components/gradient';
import { usePolkadot } from '@context/polkadot_context';
import { priceFormat } from '@utils/helpers';
import classNames from 'classnames';
import { FaLock, FaUsers, FaCoins } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { StatsData } from 'src/interfaces';

const containerStyle =
  'h-44 shadow-sm rounded-2xl bg-white p-4 flex xs:p-6 xs:h-56 lg:h-44 lg:p-4 xl:h-56 2xl:p-6';
const titleStyle =
  'block text-grey font-bold leading-tight text-lg xxs:text-xl xs:text-2xl lg:text-xl xl:text-2xl';
const subtitleStyle =
  'tracking-widest whitespace-nowrap font-semibold text-[10px] xxs:text-xs lg:text-[10px] xl:text-xs text-grey2';
const valueStyle =
  'text-grey font-bold text-2xl xxs:text-3xl xs:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl';

function LockedValue({
  tvl,
  forWallet = false,
}: {
  tvl: number;
  forWallet?: boolean;
}) {
  const intl = useIntl();

  return (
    <div className="relative h-44 shadow-sm rounded-2xl overflow-hidden xs:h-56 lg:h-44 xl:h-56">
      <Gradient>
        <div className="p-4 flex flex-col h-full justify-between xs:p-6 lg:p-4 xl:p-6">
          <div>
            <span className={classNames(titleStyle, 'text-white')}>LOCKED</span>
            <span
              className={classNames(
                subtitleStyle,
                'text-white text-opacity-50',
              )}
            >
              {`${forWallet ? '' : 'TOTAL '}VALUE`}
            </span>
          </div>
          <span
            className={classNames(valueStyle, 'text-white')}
          >{`$${priceFormat(intl, tvl, 3)}`}</span>
        </div>
      </Gradient>
      <FaLock className="absolute right-1 bottom-4 h-36 w-auto xs:h-48 lg:h-36 xl:h-48 text-white text-opacity-15" />
    </div>
  );
}

function TotalLent({
  totalLent,
  forWallet = false,
}: {
  totalLent: number;
  forWallet?: boolean;
}) {
  const intl = useIntl();

  return (
    <div
      className={classNames(
        containerStyle,
        "justify-between bg-[url('/total_lent.webp')] bg-contain bg-no-repeat bg-bottom",
      )}
    >
      <span
        className={valueStyle}
      >{`$${priceFormat(intl, totalLent, 3)}`}</span>
      <div>
        <span className={titleStyle}>LENT</span>
        {!forWallet && <span className={subtitleStyle}>TOTAL</span>}
      </div>
    </div>
  );
}

function TotalBorrowed({
  totalBorrowed,
  forWallet = false,
}: {
  totalBorrowed: number;
  forWallet?: boolean;
}) {
  const intl = useIntl();

  return (
    <div
      className={classNames(
        containerStyle,
        "flex-col bg-[url('/total_borrowed.webp')] bg-no-repeat bg-center",
      )}
    >
      <span
        className={valueStyle}
      >{`$${priceFormat(intl, totalBorrowed, 3)}`}</span>
      <span
        className={subtitleStyle}
      >{`${forWallet ? '' : 'TOTAL '}BORROWED`}</span>
    </div>
  );
}

function ActiveUsers() {
  return (
    <div
      className={classNames(
        containerStyle,
        'relative flex-col justify-between',
      )}
    >
      <div className="bg-white bg-opacity-10 z-10 w-min">
        <span className={titleStyle}>USERS</span>
        <span className={subtitleStyle}>TOTAL ACTIVE</span>
      </div>
      <span className={valueStyle}>9,000+</span>
      <FaUsers className="absolute right-2 top-2 h-36 w-auto xs:h-48 lg:h-36 xl:h-48 text-pinkIcon" />
    </div>
  );
}

function TotalRewards({ totalRewards }: { totalRewards: number }) {
  const intl = useIntl();

  return (
    <div
      className={classNames(
        containerStyle,
        'relative flex-col justify-between',
      )}
    >
      <div className="bg-white bg-opacity-10 z-10 w-min">
        <span className={titleStyle}>REWARDS</span>
        <span className={subtitleStyle}>TOTAL</span>
      </div>
      <span
        className={classNames(valueStyle, 'bg-white bg-opacity-10 z-10 w-min')}
      >
        {`$${priceFormat(intl, totalRewards, 3)}`}
      </span>
      <FaCoins className="absolute right-4 top-2 h-32 w-auto xs:top-4 lg:top-2 xl:top-4 text-pinkIcon" />
    </div>
  );
}

export default function Stats({
  statsData,
  forWallet = false,
}: {
  statsData: StatsData;
  forWallet?: boolean;
}) {
  const { selectedAccount } = usePolkadot();

  return (
    <div
      className={classNames(
        'w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-6',
        selectedAccount ?? 'mt-6 md:mt-10',
      )}
    >
      <LockedValue tvl={statsData.tvl} />
      <TotalLent totalLent={statsData.totalLent} forWallet={forWallet} />
      <TotalBorrowed
        totalBorrowed={statsData.totalBorrowed}
        forWallet={forWallet}
      />
      {forWallet ? (
        <TotalRewards totalRewards={statsData.totalRewards} />
      ) : (
        <ActiveUsers />
      )}
    </div>
  );
}
