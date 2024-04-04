import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useState } from 'react';
import classNames from 'classnames';

interface DataItem {
  id: number;
  asset: string;
  apr: number;
  amount: number;
  reward: number;
}

const data: DataItem[] = [
  { id: 1, asset: 'PSWAP', apr: 5.2, amount: 1000, reward: 50 },
  { id: 2, asset: 'XOR', apr: 4.8, amount: 2000, reward: 60 },
  { id: 3, asset: 'ETH', apr: 6.5, amount: 1500, reward: 45 },
  { id: 4, asset: 'CERES', apr: 5.2, amount: 1000, reward: 50 },
  { id: 5, asset: 'HMX', apr: 4.8, amount: 2000, reward: 60 },
  { id: 6, asset: 'TBCD', apr: 6.5, amount: 1500, reward: 45 },
];

const tableHeadStyle = 'px-4 py-4 text-center font-medium text-grey lg:px-6';
const tableCellStyle = 'px-4 py-4 whitespace-nowrap lg:px-6';
const buttonStyle =
  'rounded-3xl border-2 border-pinkBorder font-semibold py-2 px-8 text-xs xxs:text-sm sm:text-base';

function SortIcon({ direction }: { direction: string }) {
  return (
    <span className="ml-1">
      {direction === 'desc' ? (
        <FaCaretDown className="h-4 w-4 inline" />
      ) : (
        <FaCaretUp className="h-4 w-4 inline" />
      )}
    </span>
  );
}

function IconContainer({ value }: { value: string }) {
  return (
    <div className="flex bg-white items-center mx-auto w-min gap-x-2 border border-border rounded-3xl py-1 px-2">
      <div className="h-6 w-6 rounded-full bg-pinkIcon flex items-center justify-center">
        <img src="/value_icon.png" />
      </div>
      <span className="font-medium text-grey">{value}</span>
    </div>
  );
}

export default function Lending() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem | null;
    direction: string;
  }>({
    key: null,
    direction: 'desc',
  });

  const requestSort = (key: keyof DataItem) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="mt-16">
      <h2 className="font-bold text-xl text-grey tracking-widest">LENDING</h2>
      <div className="max-w-full overflow-x-auto">
        <table className="mt-5 bg-tableBackground rounded-2xl shadow-sm min-w-[768px] md:min-w-full overflow-hidden divide-y divide-borderTable">
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
              <tr key={item.id}>
                <td
                  className={classNames(
                    tableCellStyle,
                    'flex items-center lg:px-12',
                  )}
                >
                  <div className="flex-shrink-0 h-8 w-8 xxs:h-12 xxs:w-12 bg-white rounded-full shadow-sm">
                    <img
                      src={`https://data.cerestoken.io/storage/icons/${item.asset}.svg`}
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
                  <IconContainer value={item.reward.toString()} />
                </td>
                <td className={classNames(tableCellStyle, 'text-center')}>
                  <button className="bg-white rounded-3xl text-grey border border-pinkIcon font-semibold text-sm py-2 px-6 lg:text-base lg:px-8">
                    Withdraw
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex mt-6 gap-3 flex-col xxs:flex-row justify-center md:justify-end">
        <button className={classNames(buttonStyle, 'bg-pinkBorder text-white')}>
          Lend asset
        </button>
        <button className={classNames(buttonStyle, 'bg-white text-pinkBorder')}>
          Get rewards
        </button>
      </div>
    </div>
  );
}
