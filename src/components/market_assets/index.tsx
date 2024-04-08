import { IconContainer, SortIcon, TableContainer } from '@components/table';
import { ICONS_URL, TOAST_ID, WALLET_NOT_CONNECTED } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import useTableSort from '@hooks/use_table_sort';
import { showErrorNotify } from '@utils/toast';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface DataItem {
  id: number;
  asset: string;
  totalDeposited: string;
  totalBorrowed: string;
  deposit: number;
  borrow: number;
  maxLoop: number;
}

const data: DataItem[] = [
  {
    id: 1,
    asset: 'PSWAP',
    totalDeposited: '$137.07M',
    totalBorrowed: '$127.02M',
    deposit: 4.2,
    borrow: 3.58,
    maxLoop: 39.36,
  },
  {
    id: 2,
    asset: 'CERES',
    totalDeposited: '$137.07M',
    totalBorrowed: '$127.02M',
    deposit: 4.2,
    borrow: 3.58,
    maxLoop: 39.36,
  },
  {
    id: 3,
    asset: 'XOR',
    totalDeposited: '$137.07M',
    totalBorrowed: '$127.02M',
    deposit: 4.2,
    borrow: 3.58,
    maxLoop: 39.36,
  },
  {
    id: 4,
    asset: 'VAL',
    totalDeposited: '$137.07M',
    totalBorrowed: '$127.02M',
    deposit: 4.2,
    borrow: 3.58,
    maxLoop: 39.36,
  },
  {
    id: 5,
    asset: 'HMX',
    totalDeposited: '$137.07M',
    totalBorrowed: '$127.02M',
    deposit: 4.2,
    borrow: 3.58,
    maxLoop: 39.36,
  },
  {
    id: 6,
    asset: 'DEO',
    totalDeposited: '$137.07M',
    totalBorrowed: '$127.02M',
    deposit: 4.2,
    borrow: 3.58,
    maxLoop: 39.36,
  },
];

const tableHeadStyle = 'px-4 py-4 text-center font-medium text-grey lg:px-6';
const tableCellStyle = 'px-4 py-4 whitespace-nowrap lg:px-6';

export default function MarketAssets() {
  const { selectedAccount } = usePolkadot();

  const navigate = useNavigate();

  const { sortConfig, requestSort, sortedData } = useTableSort<DataItem>(data);

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
            onClick={() => requestSort('deposit')}
          >
            Deposit
            {sortConfig.key === 'deposit' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th
            className={classNames(tableHeadStyle, 'cursor-pointer')}
            onClick={() => requestSort('borrow')}
          >
            Borrow
            {sortConfig.key === 'borrow' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th
            className={classNames(tableHeadStyle, 'cursor-pointer')}
            onClick={() => requestSort('maxLoop')}
          >
            Max loop
            {sortConfig.key === 'maxLoop' && (
              <SortIcon direction={sortConfig.direction} />
            )}
          </th>
          <th className={tableHeadStyle} />
        </tr>
      </thead>
      <tbody className="divide-y divide-borderTable">
        {sortedData.map(item => (
          <tr
            key={item.id}
            onClick={handleAssetClick}
            className="cursor-pointer hover:bg-grey3"
          >
            <td
              className={classNames(
                tableCellStyle,
                'flex items-center lg:px-12',
              )}
            >
              <div className="flex-shrink-0 h-8 w-8 xxs:h-12 xxs:w-12 bg-white rounded-full shadow-sm">
                <img src={`${ICONS_URL}${item.asset}.svg`} alt={item.asset} />
              </div>
              <div className="ml-4 flex flex-col font-medium text-grey text-sm xxs:text-base">
                <span>{item.asset}</span>
                <span className="text-grey2 text-xs">{`Deposited: ${item.totalDeposited}`}</span>
                <span className="text-grey2 text-xs">{`Borrowed: ${item.totalBorrowed}`}</span>
              </div>
            </td>
            <td className={tableCellStyle}>
              <IconContainer value={item.deposit.toString()} />
            </td>
            <td className={tableCellStyle}>
              <IconContainer value={item.borrow.toString()} />
            </td>
            <td className={tableCellStyle}>
              <IconContainer value={item.maxLoop.toString()} />
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
