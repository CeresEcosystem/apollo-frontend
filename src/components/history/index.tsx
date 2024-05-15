import ListPagination from '@components/pagination/list_pagination';
import TableSkeleton from '@components/skeleton/table_skeleton';
import { IconContainer, TableContainer } from '@components/table';
import { ICONS_URL } from '@constants/index';
import { formatDateAndTime, priceFormat } from '@utils/helpers';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import Filters from './filters';
import SpinnerSM from '@components/loader/spinner_sm';
import useHistory from '@hooks/use_history';
import { DashboardData } from 'src/interfaces';

const tableHeadStyle = 'px-4 py-4 text-center font-medium text-grey lg:px-6';
const tableCellStyle = 'px-4 py-4 whitespace-nowrap text-sm lg:px-6';
const tableTextCellStyle = 'font-medium text-grey text-sm';

export default function History({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  const {
    historyData,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    pageLoading,
    filterHistory,
  } = useHistory(dashboardData);

  const intl = useIntl();

  if (!historyData)
    return <TableSkeleton showButtons={false} title="HISTORY" />;

  return (
    <>
      <h2 className="mt-16 font-bold text-xl text-grey tracking-widest">
        HISTORY
      </h2>
      <Filters dashboardData={dashboardData} filterHistory={filterHistory} />
      {historyData.data.length > 0 ? (
        <div className="relative">
          <TableContainer topMargin={false}>
            <thead className="bg-grey bg-opacity-5">
              <tr>
                <th className={classNames(tableHeadStyle, 'px-12 text-start')}>
                  Asset
                </th>
                <th className={tableHeadStyle}>Action</th>
                <th className={tableHeadStyle}>Amount</th>
                <th className={tableHeadStyle}>Collateral Asset</th>
                <th className={tableHeadStyle}>Collateral Amount</th>
                <th className={tableHeadStyle}>Block Number</th>
                <th className={tableHeadStyle}>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderTable">
              {historyData.data.map(item => (
                <tr
                  key={item.blockNum + item.createdAt + item.amount}
                  className="hover:bg-grey3"
                >
                  <td
                    className={classNames(
                      tableCellStyle,
                      'flex items-center lg:px-12',
                    )}
                  >
                    <div className="flex-shrink-0 h-8 w-8 xxs:h-10 xxs:w-10 bg-white rounded-full shadow-sm">
                      <img
                        src={`${ICONS_URL}${item.token}.svg`}
                        alt={item.token}
                      />
                    </div>
                    <div className="ml-4 font-medium text-grey text-sm">
                      {item.token}
                    </div>
                  </td>
                  <td className={classNames(tableCellStyle, 'text-center')}>
                    <span className={tableTextCellStyle}>{item.method}</span>
                  </td>
                  <td className={tableCellStyle}>
                    {item.amount && (
                      <IconContainer
                        value={`${priceFormat(intl, item.amount)} ${item.token}`}
                      />
                    )}
                  </td>
                  <td
                    className={classNames(
                      tableCellStyle,
                      'flex items-center justify-center',
                    )}
                  >
                    {item.collateralToken && (
                      <>
                        <div className="flex-shrink-0 h-8 w-8 xxs:h-10 xxs:w-10 bg-white rounded-full shadow-sm">
                          <img
                            src={`${ICONS_URL}${item.collateralToken}.svg`}
                            alt={item.collateralToken}
                          />
                        </div>
                        <div className="ml-4 font-medium text-grey text-sm">
                          {item.collateralToken}
                        </div>
                      </>
                    )}
                  </td>
                  <td className={tableCellStyle}>
                    {item.collateralAmount && (
                      <IconContainer
                        value={`${priceFormat(intl, item.collateralAmount)} ${item.collateralToken}`}
                      />
                    )}
                  </td>
                  <td className={classNames(tableCellStyle, 'text-center')}>
                    <span className={tableTextCellStyle}>
                      {priceFormat(intl, item.blockNum)}
                    </span>
                  </td>
                  <td className={classNames(tableCellStyle, 'text-center')}>
                    <span className={tableTextCellStyle}>
                      {formatDateAndTime(item.createdAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
          <ListPagination
            currentPage={historyData.meta.pageNumber - 1}
            totalPages={historyData.meta.pageCount}
            goToFirstPage={goToFirstPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            goToLastPage={goToLastPage}
          />
          {pageLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <SpinnerSM />
            </div>
          )}
        </div>
      ) : (
        <span className="mt-6 block text-grey font-medium">No data</span>
      )}
    </>
  );
}
