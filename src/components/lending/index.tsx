import classNames from 'classnames';
import { IconContainer, SortIcon, TableContainer } from '@components/table';
import useTableSort from '@hooks/use_table_sort';
import { ICONS_URL, TOKEN_NAME } from '@constants/index';
import { useState } from 'react';
import LendAssetModal from './lend_asset_modal';
import WithdrawModal from './withdraw_modal';
import { LendingInfo, LendingWithdrawModal } from 'src/interfaces';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';
import RewardsModal from '@components/rewards/rewards_modal';

const tableHeadStyle = 'px-4 py-4 text-center font-medium text-grey lg:px-6';
const tableCellStyle = 'px-4 py-4 whitespace-nowrap text-sm lg:px-6';

export default function Lending({
  lendingInfo,
  reload,
}: {
  lendingInfo: LendingInfo[];
  reload: () => void;
}) {
  const intl = useIntl();
  const { sortConfig, requestSort, sortedData } = useTableSort<LendingInfo>(
    lendingInfo,
    'amount',
  );

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
              onClick={() => requestSort('rewards')}
            >
              Reward
              {sortConfig.key === 'rewards' && (
                <SortIcon direction={sortConfig.direction} />
              )}
            </th>
            <th className={tableHeadStyle}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-borderTable">
          {sortedData.map(item => (
            <tr key={item.poolAssetSymbol} className="hover:bg-grey3">
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
                <IconContainer value={`${priceFormat(intl, item.apr)}%`} />
              </td>
              <td className={tableCellStyle}>
                <IconContainer
                  value={`${priceFormat(intl, item.amount, 3)} ${item.poolAssetSymbol}`}
                />
              </td>
              <td className={tableCellStyle}>
                <IconContainer
                  value={`${priceFormat(intl, item.rewards, 3)} ${TOKEN_NAME.toUpperCase()}`}
                />
              </td>
              <td className={classNames(tableCellStyle, 'text-center')}>
                {Number(item.amount) > 0 && (
                  <button
                    onClick={() => setShowWithdrawModal({ show: true, item })}
                    className="bg-white rounded-3xl text-grey border border-pinkIcon font-semibold text-sm py-2 px-6 lg:px-8"
                  >
                    Withdraw
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <LendAssetModal
        lendingInfo={sortedData}
        showModal={showLendModal}
        closeModal={() => setShowLendModal(false)}
        reload={reload}
      />
      <RewardsModal
        assets={sortedData}
        showModal={showRewardsModal}
        closeModal={() => setShowRewardsModal(false)}
        isLending
        reload={reload}
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
        reload={reload}
      />
    </>
  );
}
