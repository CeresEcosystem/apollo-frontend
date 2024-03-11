import { useCallback, useEffect, useRef, useState } from 'react';
import { GovernancePoll, GovernancePolls } from 'src/interfaces';

const tabs = ['active', 'upcoming', 'closed'];

const useGovernance = () => {
  const allPolls = useRef<GovernancePolls>({
    active: [],
    upcoming: [],
    closed: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [polls, setPolls] = useState<GovernancePoll[]>([]);

  const getPollsForTab = useCallback((tab: string) => {
    switch (tab) {
      case 'active':
        return allPolls.current.active;
      case 'upcoming':
        return allPolls.current.upcoming;
      case 'closed':
        return allPolls.current.closed;
      default:
        return [];
    }
  }, []);

  const onChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      if (event.currentTarget.value !== selectedTab) {
        setPolls(getPollsForTab(event.currentTarget.value));
        setSelectedTab(event.currentTarget.value);
      }
    },
    [selectedTab, getPollsForTab],
  );

  const onTabSelected = useCallback(
    (name: string) => {
      if (name !== selectedTab) {
        setPolls(getPollsForTab(name));
        setSelectedTab(name);
      }
    },
    [selectedTab, getPollsForTab],
  );

  const getPolls = useCallback(async (url: string, active = 0) => {
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
  }, []);

  useEffect(() => {
    async function fetchPolls() {
      const pollsResponses = await Promise.all([
        getPolls('http://localhost:3006/api/polls/active'),
        getPolls('http://localhost:3006/api/polls/upcoming', 1),
        getPolls('http://localhost:3006/api/polls/closed', 2),
      ]);

      if (pollsResponses[0] && pollsResponses[1] && pollsResponses[2]) {
        allPolls.current = {
          active: pollsResponses[0],
          upcoming: pollsResponses[1],
          closed: pollsResponses[2],
        };
        setPolls(pollsResponses[0]);
      }

      setLoading(false);
    }

    fetchPolls();
  }, [getPolls]);

  return {
    loading,
    polls,
    tabs,
    selectedTab,
    onChange,
    onTabSelected,
  };
};

export default useGovernance;
