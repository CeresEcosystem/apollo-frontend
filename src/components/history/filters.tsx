import DateTimePicker from '@components/datepicker/date_picker';
import Select from '@components/input/select';
import { ChangeEvent, useMemo, useState } from 'react';
import { DashboardData, HistoryFilterData } from 'src/interfaces';

const actions = [
  { label: 'Lent', value: 'Lent' },
  { label: 'Borrowed', value: 'Borrowed' },
  { label: 'Withdrawn', value: 'Withdrawn' },
  { label: 'ClaimedLendingRewards', value: 'ClaimedLendingRewards' },
  { label: 'ClaimedBorrowingRewards', value: 'ClaimedBorrowingRewards' },
  { label: 'Repaid', value: 'Repaid' },
  { label: 'Liquidated', value: 'Liquidated' },
];

export default function Filters({
  dashboardData,
  filterHistory,
}: {
  dashboardData: DashboardData;
  filterHistory: (data: HistoryFilterData) => void;
}) {
  const [filterData, setFilterData] = useState<HistoryFilterData>({
    dateFrom: null,
    dateTo: null,
    asset: '',
    action: '',
  });

  const assets = useMemo(() => {
    if (!dashboardData) return [];
    return dashboardData.lendingInfo.map(token => ({
      label: token.poolAssetSymbol,
      value: token.poolAssetId,
    }));
  }, [dashboardData]);

  const clearFilters = () => {
    if (
      filterData.dateFrom ||
      filterData.dateTo ||
      filterData.asset !== '' ||
      filterData.action !== ''
    ) {
      const emptyFilters: HistoryFilterData = {
        dateFrom: null,
        dateTo: null,
        asset: '',
        action: '',
      };

      setFilterData(emptyFilters);
      filterHistory(emptyFilters);
    }
  };

  return (
    <div className="mt-6 mb-2 flex flex-col gap-x-4 gap-y-8 items-center justify-between xl:flex-row">
      <div className="flex justify-center items-center flex-wrap gap-4 xl:justify-start">
        <Select
          id="asset"
          name="asset"
          selectedOption={filterData.asset}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setFilterData(prevData => ({
              ...prevData,
              asset: {
                label: e.target.options[e.target.selectedIndex].text,
                value: e.target.value,
              },
            }));
          }}
          label="Asset"
          defaultOption="Show all assets"
          options={assets}
        />
        <Select
          id="action"
          name="action"
          selectedOption={filterData.action}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setFilterData(prevData => ({
              ...prevData,
              action: {
                label: e.target.options[e.target.selectedIndex].text,
                value: e.target.value,
              },
            }));
          }}
          label="Action"
          defaultOption="Show all actions"
          options={actions}
        />
        <DateTimePicker
          name="dateFrom"
          id="dateFrom"
          value={filterData.dateFrom}
          onChangeDate={(date: Date) =>
            setFilterData(prevData => ({
              ...prevData,
              dateFrom: date,
            }))
          }
          label={'Date from'}
        />
        <DateTimePicker
          name="dateTo"
          id="dateTo"
          value={filterData.dateTo}
          onChangeDate={(date: Date) =>
            setFilterData(prevData => ({
              ...prevData,
              dateTo: date,
            }))
          }
          label={'Date to'}
        />
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => filterHistory(filterData)}
          className="rounded-3xl h-min py-2 font-semibold border-2 border-pinkBorder whitespace-nowrap bg-pinkBorder px-3 text-white text-xs"
        >
          Filter history
        </button>
        <button
          onClick={() => clearFilters()}
          className="rounded-3xl h-min py-2 font-semibold whitespace-nowrap border-2 border-pinkBorder px-3 bg-white text-pinkBorder text-xs"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
