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
import { ICONS_URL } from '@constants/index';
// import RewardsModal from '@components/rewards/rewards_modal';
import {
  BorrowingCollateralModal,
  BorrowingInfo,
  Collateral,
} from 'src/interfaces';
// import BorrowAssetModal from './borrow_asset_modal';
import RepayModal from './repay_modal';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';
// import AddMoreModal from './add_more_modal';

function Collaterals({
  collaterals,
  showRepayModal,
  showAddMoreModal,
}: {
  collaterals: Collateral[];
  showRepayModal: (item: Collateral) => void;
  showAddMoreModal: (item: Collateral) => void;
}) {
  const intl = useIntl();

  return (
    <div className="bg-slate-300 w-full">
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
                  {priceFormat(intl, collateral.collateralAmount, 3)}
                </span>
              </td>
              <td className={tableCellCollateralStyle}>
                <span className="text-grey block text-center text-sm">
                  {priceFormat(intl, collateral.borrowedAmount, 3)}
                </span>
              </td>
              <td className={tableCellCollateralStyle}>
                <span className="text-grey block text-center text-sm">
                  {priceFormat(intl, collateral.interest, 3)}
                </span>
              </td>
              <td className={tableCellCollateralStyle}>
                <span className="text-grey block text-center text-sm">
                  {priceFormat(intl, collateral.rewards, 3)}
                </span>
              </td>
              <td
                className={classNames(tableCellCollateralStyle, 'text-center')}
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
    </div>
  );
}

export default function Borrowing({
  borrowingInfo,
}: {
  borrowingInfo: BorrowingInfo[];
}) {
  const { sortConfig, requestSort, sortedData } = useTableSort<BorrowingInfo>(
    borrowingInfo,
    'amount',
  );

  const intl = useIntl();

  const [collateralId, setCollateralId] = useState<string | null>(null);
  // const [showBorrowModal, setShowBorrowModal] = useState(false);
  // const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showRepayModal, setShowRepayModal] =
    useState<BorrowingCollateralModal>({
      show: false,
      item: null,
    });
  // const [showAddMoreModal, setShowAddMoreModal] =
  //   useState<BorrowingCollateralModal>({
  //     show: false,
  //     item: null,
  //   });

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
        // firstButtonCallback={() => setShowBorrowModal(true)}
        secondButtonTitle="Get rewards"
        // secondButtonCallback={() => setShowRewardsModal(true)}
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
                    <div className="flex-shrink-0 h-8 w-8 xxs:h-12 xxs:w-12 bg-white rounded-full shadow-sm">
                      <img
                        src={`${ICONS_URL}${item.poolAssetSymbol}.svg`}
                        alt={item.poolAssetSymbol}
                      />
                    </div>
                    <div className="ml-4 font-medium text-grey text-sm xxs:text-base">
                      {item.poolAssetSymbol}
                    </div>
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={priceFormat(intl, item.interestApr)}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={priceFormat(intl, item.rewardsApr)} />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={priceFormat(intl, item.amount, 3)} />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer
                      value={priceFormat(intl, item.interest, 3)}
                    />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={priceFormat(intl, item.rewards, 3)} />
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
                    <td colSpan={7} className="p-4">
                      <Collaterals
                        collaterals={item.collaterals}
                        showRepayModal={() =>
                          setShowRepayModal({ show: true, item })
                        }
                        showAddMoreModal={() => {}} // setShowAddMoreModal({ show: true, item })
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </TableContainer>
      {/* <BorrowAssetModal
        assets={data}
        showModal={showBorrowModal}
        closeModal={() => setShowBorrowModal(false)}
      /> */}
      {/* <RewardsModal
        assets={data}
        showModal={showRewardsModal}
        closeModal={() => setShowRewardsModal(false)}
      /> */}
      <RepayModal
        collateral={showRepayModal.item}
        showModal={showRepayModal.show}
        closeModal={() =>
          setShowRepayModal(oldState => ({
            ...oldState,
            show: false,
          }))
        }
      />
      {/* <AddMoreModal
        collateral={showAddMoreModal.item}
        showModal={showAddMoreModal.show}
        closeModal={() =>
          setShowAddMoreModal(oldState => ({
            ...oldState,
            show: false,
          }))
        }
        assets={data}
      /> */}
    </>
  );
}
