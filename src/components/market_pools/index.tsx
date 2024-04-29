import { IconContainer, SortIcon, TableContainer } from '@components/table';
import { ICONS_URL, TOAST_ID, WALLET_NOT_CONNECTED } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import useTableSort from '@hooks/use_table_sort';
import { priceFormat } from '@utils/helpers';
import { showErrorNotify } from '@utils/toast';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { MarketPool } from 'src/interfaces';

const tableHeadStyle = 'px-4 py-4 text-center font-medium text-grey lg:px-6';
const tableCellStyle = 'px-4 py-4 whitespace-nowrap lg:px-6';

export default function MarketPools({ pools }: { pools: MarketPool[] }) {
  const { selectedAccount } = usePolkadot();

  const intl = useIntl();

  const navigate = useNavigate();

  const { sortConfig, requestSort, sortedData } = useTableSort<MarketPool>(
    pools,
    'lendingAPR',
  );

  const handleAssetClick = () => {
    if (!selectedAccount) {
      showErrorNotify(WALLET_NOT_CONNECTED, true, TOAST_ID);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <TableContainer>
      <thead className="bg-grey bg-opacity-5">
        <tr>
          <th className={classNames(tableHeadStyle, 'px-12 text-start')}>
            Asset
          </th>
          <th
            className={classNames(tableHeadStyle, 'cursor-pointer')}
            onClick={() => requestSort('lendingAPR')}
          >
            Lending APR
            {sortConfig.key === 'lendingAPR' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th
            className={classNames(tableHeadStyle, 'cursor-pointer')}
            onClick={() => requestSort('lent')}
          >
            Total Lent
            {sortConfig.key === 'lent' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th
            className={classNames(tableHeadStyle, 'cursor-pointer')}
            onClick={() => requestSort('borrowingAPR')}
          >
            Borrowing APR
            {sortConfig.key === 'borrowingAPR' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th
            className={classNames(tableHeadStyle, 'cursor-pointer')}
            onClick={() => requestSort('borrowed')}
          >
            Total Borrowed
            {sortConfig.key === 'borrowed' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th className={tableHeadStyle} />
        </tr>
      </thead>
      <tbody className="divide-y divide-borderTable">
        {sortedData.map(item => (
          <tr
            key={item.poolAssetId}
            onClick={handleAssetClick}
            className="cursor-pointer hover:bg-grey3"
          >
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
              <span className="ml-4 font-medium text-grey text-sm">
                {item.poolAssetSymbol}
              </span>
            </td>
            <td className={tableCellStyle}>
              <IconContainer value={`${priceFormat(intl, item.lendingAPR)}%`} />
            </td>
            <td className={tableCellStyle}>
              <IconContainer value={`$${priceFormat(intl, item.lent)}`} />
            </td>
            <td className={tableCellStyle}>
              <IconContainer
                value={`${priceFormat(intl, item.borrowingAPR)}%`}
              />
            </td>
            <td className={tableCellStyle}>
              <IconContainer value={`$${priceFormat(intl, item.borrowed)}`} />
            </td>
            <td className={tableCellStyle}>
              <div className="flex justify-center">
                <ChevronRightIcon className="h-5 w-5 text-grey" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}
