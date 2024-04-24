import Polls from '@components/governance/polls';
import TitleWithSubtitle from '@components/heading/title_with_subtitle';
import SpinnerSM from '@components/loader/spinner_sm';
import PageFullscreen from '@components/page_container/page_fullscreen';
import Tabs from '@components/tabs';
import useGovernance from '@hooks/use_governance';
import { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export function Component() {
  const { isLoading, data, tabs, selectedTab, onChange, onTabSelected } =
    useGovernance();

  const { pollId } = useParams();

  const polls = useMemo(() => {
    if (data) {
      switch (selectedTab) {
        case 'active':
          return data.active;
        case 'upcoming':
          return data.upcoming;
        case 'closed':
          return data.closed;
        default:
          return [];
      }
    }

    return [];
  }, [data, selectedTab]);

  return (
    <PageFullscreen showBackgroundImage>
      {pollId ? (
        <Outlet />
      ) : (
        <div className="px-5 max-w-3xl mx-auto xs:px-10 lg:px-0">
          <TitleWithSubtitle
            title={'Governance'}
            subtitle={
              'Governance platform is a tool for implementing the concept of decentralization in Apollo Protocol.'
            }
          />
          {isLoading ? (
            <SpinnerSM />
          ) : (
            <>
              <Tabs
                tabs={tabs}
                selectedTab={selectedTab}
                onChange={onChange}
                setSelectedTab={onTabSelected}
              />
              {polls.length > 0 ? (
                <Polls polls={polls} selectedTab={selectedTab} />
              ) : (
                <p className="text-grey mt-5">{`No ${selectedTab} polls.`}</p>
              )}
            </>
          )}
        </div>
      )}
    </PageFullscreen>
  );
}

Component.displayName = 'Governance';
