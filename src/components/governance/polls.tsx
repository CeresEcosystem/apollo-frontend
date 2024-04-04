import { formatDateFromTimestamp } from '@utils/helpers';
import { hexToString } from '@polkadot/util';
import { Link } from 'react-router-dom';
import { GovernancePoll } from 'src/interfaces';

export default function Polls({
  polls,
  selectedTab,
}: {
  polls: GovernancePoll[];
  selectedTab: string;
}) {
  const getEndDate = (poll: GovernancePoll) => {
    switch (selectedTab) {
      case 'active':
        return `Closing at: ${formatDateFromTimestamp(poll.dateTo)}`;
      case 'upcoming':
        return `Starts at: ${formatDateFromTimestamp(poll.dateFrom)}`;
      case 'closed':
        return `Closed at: ${formatDateFromTimestamp(poll.dateTo)}`;
      default:
        return '';
    }
  };

  return (
    <div className="mt-12 flow-root">
      <ul role="list" className="space-y-3">
        {polls.map(poll => (
          <li
            key={poll.pollId}
            className=" p-4 xxs:p-6 bg-white border border-borderLight rounded-3xl lg:p-12 hover:bg-backgroundBody hover:border-pinkBorder"
          >
            <h3 className="font-bold text-grey">{poll.title}</h3>
            <p className="mt-3 mb-6 text-sm text-grey2 line-clamp-3">
              {poll.description.startsWith('0x')
                ? hexToString(poll.description)
                : poll.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-grey pr-2">{getEndDate(poll)}</span>
              <Link
                to={`/governance/${poll.pollId}`}
                className="px-4 py-2 text-sm font-semibold underline text-pinkBorder md:hidden"
              >
                View
              </Link>
              <Link
                to={`/governance/${poll.pollId}`}
                className="hidden px-4 py-2 text-sm font-semibold underline text-pinkBorder md:block"
              >
                View proposal
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
