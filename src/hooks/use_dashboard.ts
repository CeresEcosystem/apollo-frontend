import { API_URL } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';
import { useQuery } from '@tanstack/react-query';
import { getEncodedAddress } from '@utils/helpers';
import { DashboardData } from 'src/interfaces';

const useDashboard = () => {
  const { selectedAccount, keyring } = usePolkadot();

  const { isLoading, error, data, refetch } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/users/${getEncodedAddress(keyring, selectedAccount?.address)}`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const dashboardData = (await response.json()) as DashboardData;

      return {
        lendingInfo: dashboardData.lendingInfo.filter(info => !info.isRemoved),
        borrowingInfo: dashboardData.borrowingInfo.filter(
          info => !info.isRemoved,
        ),
        userData: dashboardData.userData,
      };
    },
  });

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};

export default useDashboard;
