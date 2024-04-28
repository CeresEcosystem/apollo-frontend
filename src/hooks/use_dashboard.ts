import { API_URL } from '@constants/index';
// import { usePolkadot } from '@context/polkadot_context';
import { useQuery } from '@tanstack/react-query';
// import { getEncodedAddress } from '@utils/helpers';
import { DashboardData } from 'src/interfaces';

const useDashboard = () => {
  // const { selectedAccount, keyring } = usePolkadot();

  const { isLoading, error, data, refetch } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      // const response = await fetch(
      //   `${API_URL}/users/${getEncodedAddress(keyring, selectedAccount?.address)}`,
      // );

      const response = await fetch(
        `${API_URL}/users/cnU7SgAFDAwT2Bfm3T8bt6SU1NDubwWA433wqbshnqVQAHsuu`,
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    },
  });

  return {
    isLoading: isLoading || error || !data,
    data,
    refetch,
  };
};

export default useDashboard;
