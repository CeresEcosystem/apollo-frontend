import { API_URL } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { getEncodedAddress } from '@utils/helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DashboardData, HistoryData, HistoryFilterData } from 'src/interfaces';

const useHistory = (data: DashboardData) => {
  const { selectedAccount, keyring } = usePolkadot();

  const [pageLoading, setPageLoading] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryData | undefined>();

  const lastFilterOptions = useRef<HistoryFilterData | undefined>();

  const getHistoryFilters = useCallback(
    (historyFilterData: HistoryFilterData) => {
      let historyOptions = '';

      if (historyFilterData.dateFrom) {
        historyOptions += `&dateFrom=${historyFilterData.dateFrom.toISOString()}`;
      }

      if (historyFilterData.dateTo) {
        historyOptions += `&dateTo=${historyFilterData.dateTo.toISOString()}`;
      }

      if (historyFilterData.asset !== '') {
        historyOptions += `&token=${historyFilterData.asset.label}`;
      }

      if (historyFilterData.action !== '') {
        historyOptions += `&method=${historyFilterData.action.value}`;
      }

      return historyOptions;
    },
    [],
  );

  const fetchHistory = useCallback(
    async (page = 1, historyFilterData = lastFilterOptions.current) => {
      const historyOptions = historyFilterData
        ? getHistoryFilters(historyFilterData)
        : '';

      const response = await fetch(
        `${API_URL}/users/${getEncodedAddress(keyring, selectedAccount?.address)}/actions?size=5&page=${page}${historyOptions}`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const json = await response.json();
      setHistoryData(json);
      setPageLoading(false);
    },
    [getHistoryFilters, keyring, selectedAccount?.address],
  );

  useEffect(() => {
    if (selectedAccount && data) {
      fetchHistory();
    }
  }, [selectedAccount, fetchHistory, data]);

  const goToFirstPage = useCallback(() => {
    if (historyData?.meta.hasPreviousPage) {
      setPageLoading(true);
      fetchHistory();
    }
  }, [fetchHistory, historyData]);

  const goToPreviousPage = useCallback(() => {
    if (historyData?.meta.hasPreviousPage) {
      setPageLoading(true);
      fetchHistory(historyData.meta.pageNumber - 1);
    }
  }, [fetchHistory, historyData]);

  const goToNextPage = useCallback(() => {
    if (historyData?.meta.hasNextPage) {
      setPageLoading(true);
      fetchHistory(historyData.meta.pageNumber + 1);
    }
  }, [fetchHistory, historyData]);

  const goToLastPage = useCallback(() => {
    if (historyData?.meta.hasNextPage) {
      setPageLoading(true);
      fetchHistory(historyData.meta.pageCount);
    }
  }, [fetchHistory, historyData]);

  const filterHistory = useCallback(
    (historyFilterData: HistoryFilterData) => {
      if (historyFilterData !== lastFilterOptions.current) {
        setPageLoading(true);
        lastFilterOptions.current = historyFilterData;
        fetchHistory(1, historyFilterData);
      }
    },
    [fetchHistory],
  );

  return {
    historyData,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    pageLoading,
    filterHistory,
  };
};

export default useHistory;
