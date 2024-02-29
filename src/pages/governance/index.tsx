import Polls from '@components/governance/polls';
import TitleWithSubtitle from '@components/heading/title_with_subtitle';
import PageFullscreen from '@components/page_container/page_fullscreen';
import Tabs from '@components/tabs';
import useGovernance from '@hooks/use_governance';

export default function Governance() {
  const { loading, polls, tabs, selectedTab, onChange, onTabSelected } =
    useGovernance();

  return (
    <PageFullscreen>
      <div className="px-5 max-w-3xl mx-auto xs:px-10 lg:px-0">
        <TitleWithSubtitle
          title={'Governance'}
          subtitle={
            'Governance platform is a tool for implementing the concept of decentralization in Apollo Protocol.'
          }
        />
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onChange={onChange}
          setSelectedTab={onTabSelected}
        />
        {loading ? (
          <span>Loading...</span>
        ) : polls.length > 0 ? (
          <Polls polls={polls} selectedTab={selectedTab} />
        ) : (
          <p className="text-grey mt-5">{`No ${selectedTab} polls.`}</p>
        )}
      </div>
    </PageFullscreen>
  );
}
