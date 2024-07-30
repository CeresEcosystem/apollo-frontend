import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { GovernancePoll, GovernancePolls } from 'src/interfaces';

const tabs = ['active', 'upcoming', 'closed'];

async function getPolls(url: string, active = 0) {
  const response = await fetch(url);

  if (response.ok) {
    const pollsArray = (await response.json()) as GovernancePoll[];

    if (active === 0 || active === 2) {
      pollsArray.sort(function (poll1, poll2) {
        return poll2.dateFrom - poll1.dateFrom;
      });
    }

    return active === 1 ? pollsArray.reverse() : pollsArray;
  }

  return [];
}

const useGovernance = () => {
  const { isLoading, error, data } = useQuery<GovernancePolls>({
    queryKey: ['governanceData'],
    queryFn: async () => {
      const [activePolls, upcomingPolls, closedPolls] = await Promise.all([
        getPolls(`${import.meta.env.VITE_BACKEND_URL}/polls/active`),
        getPolls(`${import.meta.env.VITE_BACKEND_URL}/polls/upcoming`, 1),
        getPolls(`${import.meta.env.VITE_BACKEND_URL}/polls/closed`, 2),
      ]);

      return {
        active: activePolls,
        upcoming: upcomingPolls,
        closed: closedPolls,
      };
    },
  });

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const onChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      if (event.currentTarget.value !== selectedTab) {
        setSelectedTab(event.currentTarget.value);
      }
    },
    [selectedTab],
  );

  const onTabSelected = useCallback(
    (name: string) => {
      if (name !== selectedTab) {
        setSelectedTab(name);
      }
    },
    [selectedTab],
  );

  return {
    isLoading: isLoading || error || !data,
    data,
    tabs,
    selectedTab,
    onChange,
    onTabSelected,
  };
};

export default useGovernance;
