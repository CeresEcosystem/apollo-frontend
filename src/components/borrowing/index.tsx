import { Fragment, useState } from 'react';
import classNames from 'classnames';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
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

function Collaterals({
  asset,
  collaterals,
  showRepayModal,
  showAddMoreModal,
}: {
  asset: BorrowingInfo;
  collaterals: Collateral[];
  showRepayModal: (item: Collateral) => void;
  showAddMoreModal: (item: Collateral) => void;
}) {
  const intl = useIntl();

  return (
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
        {collaterals.map(collateral => (
          <tr key={collateral.collateralAssetId} className="hover:bg-grey3">
            <td
              className={classNames(
                tableCellCollateralStyle,
                'flex items-center justify-center',
              )}
            >
              <div className="flex-shrink-0 h-8 w-8 bg-white rounded-full shadow-sm">
                <img
                  src={`https://data.cerestoken.io/storage/icons/${collateral.collateralAssetSymbol}.svg`}
                  alt={collateral.collateralAssetSymbol}
                />
              </div>
              <span className="ml-4 text-grey min-w-14 text-sm">
                {collateral.collateralAssetSymbol}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {`${priceFormat(intl, collateral.collateralAmount, 3)} ${collateral.collateralAssetSymbol}`}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {`${priceFormat(intl, collateral.borrowedAmount, 3)} ${asset.poolAssetSymbol}`}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {`${priceFormat(intl, collateral.interest, 3)} ${asset.poolAssetSymbol}`}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {`${priceFormat(intl, collateral.rewards, 3)} ${TOKEN_NAME.toUpperCase()}`}
              </span>
            </td>
            <td className={classNames(tableCellCollateralStyle, 'text-center')}>
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
          {sortedData.map(item => {
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
                    <div className="flex-shrink-0 h-8 w-8 xxs:h-10 xxs:w-10 bg-white rounded-full shadow-sm">
                      <img
                        src={`${ICONS_URL}${item.poolAssetSymbol}.svg`}
                        alt={item.poolAssetSymbol}
                      />
                    </div>
                    <div className="ml-4 font-medium text-grey text-sm">
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
                      value={`${priceFormat(intl, item.amount, 3)} ${item.poolAssetSymbol}`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.interest, 3)} ${item.poolAssetSymbol}`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={`${priceFormat(intl, item.rewards, 3)} ${TOKEN_NAME.toUpperCase()}`}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={priceFormat(intl, item.healthFactor)}
                    />
                  </td>
                  <td className={classNames(tableCellStyle, 'text-center')}>
                    {item.collaterals.length > 0 && (
                      <button
                        onClick={() => toggleCollateralView(item.poolAssetId)}
                        className="text-pinkIcon font-semibold text-sm outline-none"
                      >
                        {selected ? 'Hide collaterals' : 'Show collaterals'}
                        <ChevronRightIcon className="h-4 inline-block text-grey ml-2" />
                      </button>
                    )}
                  </td>
                </tr>
                {selected && (
                  <tr className="border-none">
                    <td colSpan={8} className="p-4">
                      <Collaterals
                        asset={item}
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
                    </td>
                  </tr>
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
