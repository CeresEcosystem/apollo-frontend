import { useQuery } from '@tanstack/react-query';
import { priceFormat } from '@utils/helpers';
import { IntlShape, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import {
  GovernacePollResults,
  GovernancePollDetailsData,
  GovernancePollDetails,
} from 'src/interfaces';

export function getPollAnswer(options: string[], answer: number) {
  return options[answer - 1];
}

async function fetchPollDetails(intl: IntlShape, pollId: string | undefined) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/polls/${pollId}`,
  );

  const poll = (await response.json()) as GovernancePollDetails;
  const results: GovernacePollResults = {};

  if (poll.status === 'active' || poll.status === 'closed') {
    const total = poll.voters?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.numberOfVotes,
      0,
    );

    poll.options?.forEach(
      option =>
        (results[option] = { sum: 0, percentage: 0, sumFormatted: '0' }),
    );

    for (let i = 0; i < poll.voters.length; i++) {
      const option = getPollAnswer(poll.options, poll.voters[i]?.votingOption);

      if (option) {
        results[option].sum =
          (results[option]?.sum || 0) + poll.voters[i]?.numberOfVotes;
        results[option].percentage = (results[option].sum / total) * 100;
        results[option].sumFormatted = priceFormat(intl, results[option].sum);
      }
    }
  }

  return { poll, results };
}

const useGovernancePoll = () => {
  const { pollId } = useParams();
  const intl = useIntl();

  const { isLoading, error, data, refetch } =
    useQuery<GovernancePollDetailsData>({
      queryKey: ['governancePollData', pollId],
      queryFn: async () => await fetchPollDetails(intl, pollId),
    });

  return {
    isLoading: isLoading || error || !data,
    data,
    refetch,
  };
};

export default useGovernancePoll;
