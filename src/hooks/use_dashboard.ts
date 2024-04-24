import { API_URL } from '@constants/index';
import { useQuery } from '@tanstack/react-query';
import { DashboardData } from 'src/interfaces';

const useDashboard = () => {
  const { isLoading, error, data } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: () =>
      fetch(
        `${API_URL}/users/cnU7SgAFDAwT2Bfm3T8bt6SU1NDubwWA433wqbshnqVQAHsuu`,
      ).then(res => res.json()),
  });

  return {
    isLoading: isLoading || error || !data,
    data,
    error,
  };
};

export default useDashboard;
