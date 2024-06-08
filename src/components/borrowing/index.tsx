import { Fragment, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  IconContainer,
  SortIcon,
  TableContainer,
  tableButtonStyle,
  tableCellCollateralStyle,
  tableCellStyle,
  tableHeadStyle,
} from '@components/table';
import useTableSort from '@hooks/use_table_sort';
import { ICONS_URL, TOKEN_NAME } from '@constants/index';
import RewardsModal from '@components/rewards/rewards_modal';
import {
  BorrowingCollateralModal,
  BorrowingInfo,
  Collateral,
  LendingInfo,
} from 'src/interfaces';
import BorrowAssetModal from './borrow_asset_modal';
import RepayModal from './repay_modal';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';
import AddMoreModal from './add_more_modal';
import { Tooltip } from 'react-tooltip';
import { useTokenPrice } from 'src/store';

function TooltipHealthFactor({ healthFactor }: { healthFactor: number }) {
  const id = 'health-factor';

  if (healthFactor > 0 && healthFactor <= 1.3) {
    return (
      <>
        <ExclamationTriangleIcon
          data-tooltip-id={id}
          className="text-red-600 h-4 flex-shrink-0"
        />
        <Tooltip
          id={id}
          content="Position is close to liquidation."
          delayHide={1000}
          place="top"
          className="!bg-grey !rounded-3xl"
        />
      </>
    );
  }

  return null;
}

function Collaterals({
  asset,
  price,
  collaterals,
  showRepayModal,
  showAddMoreModal,
}: {
  asset: BorrowingInfo;
  price: number;
  collaterals: Collateral[];
  showRepayModal: (item: Collateral) => void;
  showAddMoreModal: (item: Collateral) => void;
}) {
  const intl = useIntl();

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const data = useMemo(() => {
    return collaterals.map(item => {
      const priceCollateral =
        pricesForAllTokens.find(
          token => token.assetId === item.collateralAssetId,
        )?.price ?? 0;

      return {
        ...item,
        collateralAmountPrice: priceCollateral * Number(item.collateralAmount),
        borrowedPrice: price * Number(item.borrowedAmount),
        interestPrice: price * Number(item.interest),
        reward: 1 * Number(item.rewards), // add Apollo price
      };
    });
  }, [collaterals, price, pricesForAllTokens]);

  return (
    <tr className="border-none">
      <td colSpan={9} className="p-4">
        <table className="bg-backgroundBody rounded-2xl min-w-full">
          <thead>
            <tr>
              <th className={tableHeadStyle}>Asset</th>
              <th className={tableHeadStyle}>Collateral amount</th>
              <th className={tableHeadStyle}>Borrowed amount</th>
              <th className={tableHeadStyle}>Interest</th>
              <th className={tableHeadStyle}>Rewards</th>
              <th className={tableHeadStyle}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderTable">
            {data.map(collateral => (
              <tr key={collateral.collateralAssetId} className="hover:bg-grey3">
                <td
                  className={classNames(
                    tableCellCollateralStyle,
                    'flex items-center justify-center',
                  )}
                >
                  <div className="flex-shrink-0 h-8 w-8 bg-white rounded-full shadow-sm">
                    <img
                      src={`${ICONS_URL}${collateral.collateralAssetSymbol}.svg`}
                      alt={collateral.collateralAssetSymbol}
                    />
                  </div>
                  <span className="ml-4 text-grey min-w-14 text-xs">
                    {collateral.collateralAssetSymbol}
                  </span>
                </td>
                <td className={tableCellCollateralStyle}>
                  <div className="flex flex-col">
                    <span className="text-grey block text-center text-xs">
                      {`${priceFormat(intl, collateral.collateralAmount, 3)} ${collateral.collateralAssetSymbol}`}
                    </span>
                    <span className="text-grey2 block text-center text-[10px]">
                      {`$${priceFormat(intl, collateral.collateralAmountPrice, 3)}`}
                    </span>
                  </div>
                </td>
                <td className={tableCellCollateralStyle}>
                  <div className="flex flex-col">
                    <span className="text-grey block text-center text-xs">
                      {`${priceFormat(intl, collateral.borrowedAmount, 3)} ${asset.poolAssetSymbol}`}
                    </span>
                    <span className="text-grey2 block text-center text-[10px]">
                      {`$${priceFormat(intl, collateral.borrowedPrice, 3)}`}
                    </span>
                  </div>
                </td>
                <td className={tableCellCollateralStyle}>
                  <div className="flex flex-col">
                    <span className="text-grey block text-center text-xs">
                      {`${priceFormat(intl, collateral.interest, 3)} ${asset.poolAssetSymbol}`}
                    </span>
                    <span className="text-grey2 block text-center text-[10px]">
                      {`$${priceFormat(intl, collateral.interestPrice, 3)}`}
                    </span>
                  </div>
                </td>
                <td className={tableCellCollateralStyle}>
                  <div className="flex flex-col">
                    <span className="text-grey block text-center text-xs">
                      {`${priceFormat(intl, collateral.rewards, 3)} ${TOKEN_NAME.toUpperCase()}`}
                    </span>
                    <span className="text-grey2 block text-center text-[10px]">
                      {`$${priceFormat(intl, collateral.reward, 3)}`}
                    </span>
                  </div>
                </td>
                <td
                  className={classNames(
                    tableCellCollateralStyle,
                    'text-center',
                  )}
                >
                  <button
                    onClick={() => showRepayModal(collateral)}
                    className={classNames(
                      tableButtonStyle,
                      'bg-pinkBorder text-white',
                    )}
                  >
                    Repay
                  </button>
                  <button
                    onClick={() => showAddMoreModal(collateral)}
                    className={classNames(
                      tableButtonStyle,
                      'bg-white text-pinkBorder ml-2',
                    )}
                  >
                    Add more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default function Borrowing({
  lendingInfo,
  borrowingInfo,
  reload,
}: {
  lendingInfo: LendingInfo[];
  borrowingInfo: BorrowingInfo[];
  reload: () => void;
}) {
  const { sortConfig, requestSort, sortedData } = useTableSort<BorrowingInfo>(
    borrowingInfo,
    'amount',
  );

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const data = useMemo(() => {
    return sortedData.map(item => {
      const price =
        pricesForAllTokens.find(token => token.assetId === item.poolAssetId)
          ?.price ?? 0;

      return {
        ...item,
        price,
        amountPrice: price * Number(item.amount),
        interestPrice: price * Number(item.interest),
        reward: 1 * Number(item.rewards), // add Apollo price
      };
    });
  }, [sortedData, pricesForAllTokens]);

  const intl = useIntl();

  const [collateralId, setCollateralId] = useState<string | null>(null);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showRepayModal, setShowRepayModal] =
    useState<BorrowingCollateralModal>({
      show: false,
      asset: null,
      collateral: null,
    });
  const [showAddMoreModal, setShowAddMoreModal] =
    useState<BorrowingCollateralModal>({
      show: false,
      asset: null,
      collateral: null,
    });

  const toggleCollateralView = (id: string) => {
    if (collateralId === id) {
      setCollateralId(null);
    } else {
      setCollateralId(id);
    }
  };

  return (
    <>
      <TableContainer
        title="BORROWING"
        firstButtonTitle="Borrow asset"
        firstButtonCallback={() => setShowBorrowModal(true)}
        secondButtonTitle="Get rewards"
        secondButtonCallback={() => setShowRewardsModal(true)}
      >
        <thead className="bg-grey bg-opacity-5">
          <tr>
            <th className={classNames(tableHeadStyle, 'px-12 text-start')}>
              Asset
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('interestApr')}
            >
              Interest APR
              {sortConfig.key === 'interestApr' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('rewardsApr')}
            >
              Rewards APR
              {sortConfig.key === 'rewardsApr' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('loanToValue')}
            >
              Loan-to-Value
              {sortConfig.key === 'loanToValue' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('amount')}
            >
              Amount
              {sortConfig.key === 'amount' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('interest')}
            >
              Interest
              {sortConfig.key === 'interest' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('rewards')}
            >
              Reward
              {sortConfig.key === 'rewards' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th
              className={classNames(tableHeadStyle, 'cursor-pointer')}
              onClick={() => requestSort('healthFactor')}
            >
              Health factor
              {sortConfig.key === 'healthFactor' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th className={tableHeadStyle}>Collaterals</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-borderTable">
          {data.map(item => {
            const selected = collateralId === item.poolAssetId;

            return (
              <Fragment key={item.poolAssetId}>
                <tr className="hover:bg-grey3">
                  <td
                    className={classNames(
                      tableCellStyle,
                      'flex items-center lg:px-12',
                    )}
                  >
                    <div className="flex-shrink-0 h-8 w-8 bg-white rounded-full shadow-sm">
                      <img
                        src={`${ICONS_URL}${item.poolAssetSymbol}.svg`}
                        alt={item.poolAssetSymbol}
                      />
                    </div>
                    <div className="ml-4 font-medium text-grey text-xs">
                      {item.poolAssetSymbol}
                    </div>
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.interestApr)}%`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.rewardsApr)}%`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, Number(item.loanToValue) * 100)}%`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.amount, 3)} ${item.poolAssetSymbol}`}
                      secondValue={`$${priceFormat(intl, item.amountPrice, 3)}`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.interest, 3)} ${item.poolAssetSymbol}`}
                      secondValue={`$${priceFormat(intl, item.interestPrice, 3)}`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.rewards, 3)} ${TOKEN_NAME.toUpperCase()}`}
                      secondValue={`$${priceFormat(intl, item.reward, 3)}`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={priceFormat(intl, item.healthFactor)}
                      trailing={
                        <TooltipHealthFactor healthFactor={item.healthFactor} />
                      }
                    />
                  </td>
                  <td className={classNames(tableCellStyle, 'text-center')}>
                    {item.collaterals.length > 0 && (
                      <button
                        onClick={() => toggleCollateralView(item.poolAssetId)}
                        className="text-pinkIcon font-semibold text-xs outline-none"
                      >
                        {selected ? 'Hide collaterals' : 'Show collaterals'}
                        <ChevronRightIcon className="h-4 inline-block text-grey ml-2" />
                      </button>
                    )}
                  </td>
                </tr>
                {item.collaterals.length > 0 && selected && (
                  <Collaterals
                    asset={item}
                    price={item.price}
                    collaterals={item.collaterals}
                    showRepayModal={(coll: Collateral) =>
                      setShowRepayModal({
                        show: true,
                        asset: item,
                        collateral: coll,
                      })
                    }
                    showAddMoreModal={(coll: Collateral) =>
                      setShowAddMoreModal({
                        show: true,
                        asset: item,
                        collateral: coll,
                      })
                    }
                  />
                )}
              </Fragment>
            );
          })}
        </tbody>
      </TableContainer>
      <BorrowAssetModal
        borrowingInfo={sortedData}
        lendingInfo={lendingInfo}
        showModal={showBorrowModal}
        closeModal={() => setShowBorrowModal(false)}
        reload={reload}
      />
      <RewardsModal
        assets={sortedData}
        showModal={showRewardsModal}
        closeModal={() => setShowRewardsModal(false)}
        isLending={false}
        reload={reload}
      />
      <RepayModal
        asset={showRepayModal.asset}
        collateral={showRepayModal.collateral}
        showModal={showRepayModal.show}
        closeModal={() =>
          setShowRepayModal(oldState => ({
            ...oldState,
            show: false,
          }))
        }
        reload={reload}
      />
      <AddMoreModal
        asset={showAddMoreModal.asset}
        collateral={showAddMoreModal.collateral}
        showModal={showAddMoreModal.show}
        lendingInfo={lendingInfo}
        closeModal={() =>
          setShowAddMoreModal(oldState => ({
            ...oldState,
            show: false,
          }))
        }
        reload={reload}
      />
    </>
  );
}
