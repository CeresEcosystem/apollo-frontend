import { useCallback, useMemo, useState } from 'react';

const useTableSort = <T>(data: T[]) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: string;
  }>({
    key: null,
    direction: 'desc',
  });

  const requestSort = useCallback(
    (key: keyof T) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    },
    [sortConfig],
  );

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
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
  }, [data, sortConfig]);

  return { sortConfig, requestSort, sortedData };
};

export default useTableSort;
