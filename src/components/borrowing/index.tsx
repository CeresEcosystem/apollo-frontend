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
import RewardsModal from '@components/rewards/rewards_modal';
import { BorrowingCollateralModal, BorrowingDataItem } from 'src/interfaces';
import BorrowAssetModal from './borrow_asset_modal';
import RepayModal from './repay_modal';
import AddMoreModal from './add_more_modal';

const data: BorrowingDataItem[] = [
  {
    id: 1,
    asset: 'PSWAP',
    apr: 5.2,
    amount: 1000,
    interest: 39.36,
    reward: 50,
    healthFactor: 45.2,
  },
  {
    id: 2,
    asset: 'XOR',
    apr: 4.8,
    amount: 2000,
    interest: 39.36,
    reward: 60,
    healthFactor: 45.2,
  },
  {
    id: 3,
    asset: 'ETH',
    apr: 6.5,
    amount: 1500,
    interest: 39.36,
    reward: 45,
    healthFactor: 45.2,
  },
  {
    id: 4,
    asset: 'CERES',
    apr: 5.2,
    amount: 1000,
    interest: 39.36,
    reward: 50,
    healthFactor: 45.2,
  },
  {
    id: 5,
    asset: 'HMX',
    apr: 4.8,
    amount: 2000,
    interest: 39.36,
    reward: 60,
    healthFactor: 45.2,
  },
  {
    id: 6,
    asset: 'TBCD',
    apr: 6.5,
    amount: 1500,
    interest: 39.36,
    reward: 45,
    healthFactor: 45.2,
  },
];

function Collaterals({
  showRepayModal,
  showAddMoreModal,
}: {
  showRepayModal: (item: BorrowingDataItem) => void;
  showAddMoreModal: (item: BorrowingDataItem) => void;
}) {
  return (
    <table className="bg-backgroundBody rounded-2xl min-w-full">
      <thead>
        <tr>
          <th className={tableHeadStyle}>Asset</th>
          <th className={tableHeadStyle}>Collateral amount</th>
          <th className={tableHeadStyle}>Interest</th>
          <th className={tableHeadStyle}>Rewards</th>
          <th className={tableHeadStyle}>Borrowed amount</th>
          <th className={tableHeadStyle}>Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-borderTable">
        {data.map(item => (
          <tr key={item.id} className="hover:bg-grey3">
            <td
              className={classNames(
                tableCellCollateralStyle,
                'flex items-center justify-center',
              )}
            >
              <div className="flex-shrink-0 h-8 w-8 bg-white rounded-full shadow-sm">
                <img
                  src={`https://data.cerestoken.io/storage/icons/${item.asset}.svg`}
                  alt={item.asset}
                />
              </div>
              <span className="ml-4 text-grey min-w-14 text-sm">
                {item.asset}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {item.amount}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {item.interest}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {item.reward}
              </span>
            </td>
            <td className={tableCellCollateralStyle}>
              <span className="text-grey block text-center text-sm">
                {item.apr}
              </span>
            </td>
            <td className={classNames(tableCellCollateralStyle, 'text-center')}>
              <button
                onClick={() => showRepayModal(item)}
                className={classNames(
                  tableButtonStyle,
                  'bg-pinkBorder text-white',
                )}
              >
                Repay
              </button>
              <button
                onClick={() => showAddMoreModal(item)}
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

export default function Borrowing() {
  const { sortConfig, requestSort, sortedData } =
    useTableSort<BorrowingDataItem>(data);

  const [collateralId, setCollateralId] = useState<number | null>(null);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showRepayModal, setShowRepayModal] =
    useState<BorrowingCollateralModal>({
      show: false,
      item: null,
    });
  const [showAddMoreModal, setShowAddMoreModal] =
    useState<BorrowingCollateralModal>({
      show: false,
      item: null,
    });

  const toggleCollateralView = (id: number) => {
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
              onClick={() => requestSort('apr')}
            >
              APR
              {sortConfig.key === 'apr' && (
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
              onClick={() => requestSort('reward')}
            >
              Reward
              {sortConfig.key === 'reward' && (
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
            const selected = collateralId === item.id;

            return (
              <Fragment key={item.id}>
                <tr className="hover:bg-grey3">
                  <td
                    className={classNames(
                      tableCellStyle,
                      'flex items-center lg:px-12',
                    )}
                  >
                    <div className="flex-shrink-0 h-8 w-8 xxs:h-12 xxs:w-12 bg-white rounded-full shadow-sm">
                      <img
                        src={`${ICONS_URL}${item.asset}.svg`}
                        alt={item.asset}
                      />
                    </div>
                    <div className="ml-4 font-medium text-grey text-sm xxs:text-base">
                      {item.asset}
                    </div>
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={item.apr.toString()} />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={item.amount.toString()} />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={item.interest.toString()} />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={item.reward.toString()} />
                  </td>
                  <td className={tableCellStyle}>
                    <IconContainer value={item.healthFactor.toString()} />
                  </td>
                  <td className={classNames(tableCellStyle, 'text-center')}>
                    <button
                      onClick={() => toggleCollateralView(item.id)}
                      className="text-pinkIcon font-semibold text-sm outline-none"
                    >
                      {selected ? 'Hide collaterals' : 'Show collaterals'}
                      <ChevronRightIcon className="h-4 inline-block text-grey ml-2" />
                    </button>
                  </td>
                </tr>
                {selected && (
                  <tr className="border-none">
                    <td colSpan={7} className="p-4">
                      <Collaterals
                        showRepayModal={() =>
                          setShowRepayModal({ show: true, item })
                        }
                        showAddMoreModal={() =>
                          setShowAddMoreModal({ show: true, item })
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
        assets={data}
        showModal={showBorrowModal}
        closeModal={() => setShowBorrowModal(false)}
      />
      <RewardsModal
        assets={data}
        showModal={showRewardsModal}
        closeModal={() => setShowRewardsModal(false)}
      />
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
      <AddMoreModal
        collateral={showAddMoreModal.item}
        showModal={showAddMoreModal.show}
        closeModal={() =>
          setShowAddMoreModal(oldState => ({
            ...oldState,
            show: false,
          }))
        }
        assets={data}
      />
    </>
  );
}
