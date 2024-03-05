import { priceFormat } from '@utils/helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { GovernacePollResults, GovernancePollDetails } from 'src/interfaces';

export function getPollAnswer(options: string[], answer: number) {
  return options[answer - 1];
}

const useGovernancePoll = () => {
  const { pollId } = useParams();
  const intl = useIntl();

  const [loading, setLoading] = useState(true);
  const [poll, setPoll] = useState<GovernancePollDetails | undefined>();

  const results = useRef<GovernacePollResults | undefined>();

  const getPollDetails = useCallback(async () => {
    const response = await fetch(
      `https://api.cerestoken.io/api/polls/${pollId}`,
    );

    if (response.ok) {
      const poll = (await response.json()) as GovernancePollDetails;

      if (poll.status === 'active' || poll.status === 'closed') {
        const res: GovernacePollResults = {};

        const total = poll.voters?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.numberOfVotes,
          0,
        );

        poll.options?.forEach(
          option =>
            (res[option] = { sum: 0, percentage: 0, sumFormatted: '0' }),
        );

        for (let i = 0; i < poll.voters.length; i++) {
          const option = getPollAnswer(
            poll.options,
            poll.voters[i]?.votingOption,
          );

          if (option) {
            res[option].sum =
              (res[option]?.sum || 0) + poll.voters[i]?.numberOfVotes;
            res[option].percentage = (res[option].sum / total) * 100;
            res[option].sumFormatted = priceFormat(intl, res[option].sum);
          }
        }

        results.current = res;
      }

      setPoll(poll);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [intl, pollId]);

  useEffect(() => {
    getPollDetails();
  }, [getPollDetails]);

  return { poll, loading, results: results.current };
};

export default useGovernancePoll;
