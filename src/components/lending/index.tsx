import classNames from 'classnames';
import { IconContainer, SortIcon, TableContainer } from '@components/table';
import useTableSort from '@hooks/use_table_sort';
import { ICONS_URL } from '@constants/index';
import { useState } from 'react';
import LendAssetModal from './lend_asset_modal';
import WithdrawModal from './withdraw_modal';
import { LendingDataItem, LendingWithdrawModal } from 'src/interfaces';
import RewardsModal from '@components/rewards/rewards_modal';

const data: LendingDataItem[] = [
  { id: 1, asset: 'PSWAP', apr: 5.2, amount: 1000, reward: 50 },
  { id: 2, asset: 'XOR', apr: 4.8, amount: 2000, reward: 60 },
  { id: 3, asset: 'ETH', apr: 6.5, amount: 1500, reward: 45 },
  { id: 4, asset: 'CERES', apr: 5.2, amount: 1000, reward: 50 },
  { id: 5, asset: 'HMX', apr: 4.8, amount: 2000, reward: 60 },
  { id: 6, asset: 'TBCD', apr: 6.5, amount: 1500, reward: 45 },
];

const tableHeadStyle = 'px-4 py-4 text-center font-medium text-grey lg:px-6';
const tableCellStyle = 'px-4 py-4 whitespace-nowrap lg:px-6';

export default function Lending() {
  const { sortConfig, requestSort, sortedData } =
    useTableSort<LendingDataItem>(data);

  const [showLendModal, setShowLendModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] =
    useState<LendingWithdrawModal>({
      show: false,
      item: null,
    });

  return (
    <>
      <TableContainer
        title="LENDING"
        firstButtonTitle="Lend asset"
        firstButtonCallback={() => setShowLendModal(true)}
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
              onClick={() => requestSort('reward')}
            >
              Reward
              {sortConfig.key === 'reward' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th className={tableHeadStyle}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-borderTable">
          {sortedData.map(item => (
            <tr key={item.id} className="hover:bg-grey3">
              <td
                className={classNames(
                  tableCellStyle,
                  'flex items-center lg:px-12',
                )}
              >
                <div className="flex-shrink-0 h-8 w-8 xxs:h-12 xxs:w-12 bg-white rounded-full shadow-sm">
                  <img src={`${ICONS_URL}${item.asset}.svg`} alt={item.asset} />
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
                <IconContainer value={item.reward.toString()} />
              </td>
              <td className={classNames(tableCellStyle, 'text-center')}>
                <button
                  onClick={() => setShowWithdrawModal({ show: true, item })}
                  className="bg-white rounded-3xl text-grey border border-pinkIcon font-semibold text-sm py-2 px-6 lg:px-8"
                >
                  Withdraw
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <LendAssetModal
        assets={data}
        showModal={showLendModal}
        closeModal={() => setShowLendModal(false)}
      />
      <RewardsModal
        assets={data}
        showModal={showRewardsModal}
        closeModal={() => setShowRewardsModal(false)}
      />
      <WithdrawModal
        showModal={showWithdrawModal.show}
        closeModal={() =>
          setShowWithdrawModal(oldState => ({
            ...oldState,
            show: false,
          }))
        }
        asset={showWithdrawModal.item}
      />
    </>
  );
}
