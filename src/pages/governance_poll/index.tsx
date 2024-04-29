import CurrentResults from '@components/governance/current_results';
import PollDetails from '@components/governance/poll_details';
import PollInformation from '@components/governance/poll_information';
import Vote from '@components/governance/vote';
import VotesTable from '@components/governance/votes_table';
import TitleWithSubtitle from '@components/heading/title_with_subtitle';
import SpinnerSM from '@components/loader/spinner_sm';
import useGovernancePoll from '@hooks/use_governance_poll';

export function Component() {
  const { isLoading, data, refetch } = useGovernancePoll();

  if (isLoading) {
    return <SpinnerSM />;
  }

  return (
    <div className="px-5 max-w-5xl mx-auto xs:px-10 sm:px-20 xl:px-0">
      <TitleWithSubtitle
        title={'Governance'}
        subtitle={
          'Governance platform is a tool for implementing the concept of decentralization in Apollo Protocol.'
        }
      />
      <div className="grid gap-y-10 gap-x-10 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-32">
        <PollDetails poll={data!.poll} />
        <PollInformation poll={data!.poll} />
        {data!.poll.status !== 'upcoming' && (
          <Vote poll={data!.poll} reload={refetch} />
        )}
        {data!.poll.status !== 'upcoming' && (
          <CurrentResults results={data!.results} />
        )}
        {data!.poll.status !== 'upcoming' && <VotesTable poll={data!.poll} />}
      </div>
    </div>
  );
}

Component.displayName = 'Governance Poll';
