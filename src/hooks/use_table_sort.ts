import { useCallback, useMemo, useState } from 'react';

const useTableSort = <T>(data: T[], initialKeySort?: keyof T) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | undefined;
    direction: string;
  }>({
    key: initialKeySort,
    direction: 'desc',
  });

  const requestSort = useCallback(
    (key: keyof T) => {
      let direction = 'desc';

      if (sortConfig.key === key) {
        if (sortConfig.direction === 'asc') {
          direction = 'desc';
        } else {
          direction = 'asc';
        }
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
