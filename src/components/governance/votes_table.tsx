import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline';
import { getPollAnswer } from '@hooks/use_governance_poll';
import { formatWalletAddress } from '@utils/helpers';
import { showSuccessNotify } from '@utils/toast';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { GovernancePollDetails } from 'src/interfaces';

const tableLimit = 6;

export default function VotesTable({ poll }: { poll: GovernancePollDetails }) {
  const [page, setPage] = useState(0);

  const numberOfPages = Math.ceil(poll?.voters?.length / tableLimit);

  const getVotes = () => {
    const startIndex = page * tableLimit;

    if (page + 1 < numberOfPages) {
      return poll?.voters?.slice(startIndex, startIndex + 6);
    }

    return poll?.voters?.slice(startIndex, poll?.voters?.length);
  };

  const votesSlice = getVotes();

  const renderPagination = () => (
    <div className="flex items-center justify-center mt-6">
      <ChevronDoubleLeftIcon
        className="cursor-pointer h-5"
        onClick={() => {
          if (page > 0) {
            setPage(0);
          }
        }}
      />
      <ChevronLeftIcon
        className="cursor-pointer h-5"
        onClick={() => {
          if (page > 0) {
            setPage(page - 1);
          }
        }}
      />
      <span className="text-sm px-4 text-grey">{`${page + 1}/${numberOfPages}`}</span>
      <ChevronRightIcon
        className="cursor-pointer h-5"
        onClick={() => {
          if (page + 1 < numberOfPages) {
            setPage(page + 1);
          }
        }}
      />
      <ChevronDoubleRightIcon
        className="cursor-pointer h-5"
        onClick={() => {
          if (page + 1 < numberOfPages) {
            setPage(numberOfPages - 1);
          }
        }}
      />
    </div>
  );

  return (
    <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl border-2 border-borderLight">
      <span className="py-5 mx-5 inline-flex items-center text-lg text-grey font-bold">
        <img src="/poll_info.png" alt="Poll info" className="mr-2" />
        {`Votes ( ${poll?.voters?.length} )`}
      </span>
      <hr className="border border-borderLight" />
      <div className="flex flex-col p-5">
        {votesSlice?.length > 0 ? (
          votesSlice?.map((vote, index) => {
            return (
              <div key={index.toString()} className="flex py-4">
                <div className="flex items-center w-1/2 px-2 overflow-hidden self-center">
                  <div className="text-sm text-grey whitespace-nowrap text-ellipsis text-center max-w-full">
                    {formatWalletAddress(vote.accountId)}
                  </div>
                  <CopyToClipboard
                    text={vote.accountId}
                    onCopy={() => showSuccessNotify('Wallet address copied.')}
                  >
                    <ClipboardIcon className="h-4 ml-1 text-grey cursor-pointer" />
                  </CopyToClipboard>
                </div>
                <div className="flex items-center w-1/4 px-2 overflow-hidden self-center">
                  <div className="text-sm text-grey whitespace-nowrap text-ellipsis text-center max-w-full">
                    {getPollAnswer(poll.options, vote.votingOption)}
                  </div>
                </div>
                <div className="flex items-center w-1/4 px-2 overflow-hidden self-center">
                  <div className="text-sm text-grey whitespace-nowrap text-ellipsis text-center max-w-full">
                    {vote.numberOfVotes}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-grey">No votes</span>
        )}
        {poll?.voters?.length > tableLimit && renderPagination()}
      </div>
    </div>
  );
}

/* 

<Fragment key={index.toString()}>
                {renderLabelInfoWithIconsRow(
                  vote.accountId,
                  getPollAnswer(poll.options, vote.votingOption),
                  vote.numberOfVotes
                )}
              </Fragment>
*/
