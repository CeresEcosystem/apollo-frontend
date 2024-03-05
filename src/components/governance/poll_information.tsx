import { formatDateFromTimestamp, formatWalletAddress } from '@utils/helpers';
import { showSuccessNotify } from '@utils/toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GovernancePollDetails } from 'src/interfaces';

const Information = ({
  label,
  info,
  copyInfo,
}: {
  label: string;
  info: string;
  copyInfo?: string;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-grey text-sm">{label}</span>
    {copyInfo && copyInfo !== '' ? (
      <CopyToClipboard
        text={copyInfo}
        onCopy={() => showSuccessNotify('Poll Id copied.')}
      >
        <span className={'text-grey font-semibold text-sm cursor-pointer'}>
          {info}
        </span>
      </CopyToClipboard>
    ) : (
      <span className={'text-grey capitalize font-semibold text-sm'}>
        {info}
      </span>
    )}
  </div>
);

export default function PollInformation({
  poll,
}: {
  poll: GovernancePollDetails;
}) {
  return (
    <div className="border-2 bg-white rounded-3xl border-borderLight md:col-span-2">
      <span className="py-5 mx-5 inline-flex items-center text-lg text-grey font-bold">
        <img src="/poll_info.png" alt="Poll info" className="mr-2" />
        Information
      </span>
      <hr className="border border-borderLight" />
      <div className="p-5 space-y-4">
        <Information
          label="Poll Id"
          copyInfo={poll.pollId}
          info={formatWalletAddress(poll.pollId, 6)}
        />
        <Information label="Voting system" info="Single choice voting" />
        {poll.dateFrom && (
          <Information
            label="Start date"
            info={formatDateFromTimestamp(poll.dateFrom)}
          />
        )}
        {poll.dateTo && (
          <Information
            label="End date"
            info={formatDateFromTimestamp(poll.dateTo)}
          />
        )}
        <Information label="Status" info={poll.status} />
      </div>
    </div>
  );
}
