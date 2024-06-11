import useGovernanceVoting from '@hooks/use_governance_voting';
import { useMemo, useState } from 'react';
import {
  GovernancePollDetails,
  GovernanceSelectedAnswer,
} from 'src/interfaces';
import Container from './container';
import classNames from 'classnames';
import VotesModal from './votes_modal';
import useBalance from '@hooks/use_balance';
import { showErrorNotify } from '@utils/toast';
import { TOAST_ID } from '@constants/index';
import { usePolkadot } from '@context/polkadot_context';

export default function Vote({
  poll,
  reload,
}: {
  poll: GovernancePollDetails;
  reload: () => void;
}) {
  const { selectedAccount } = usePolkadot();

  const { hasVoted, vote, withdraw, loading } = useGovernanceVoting(poll);
  const { getBalance } = useBalance();

  const [selectedAnswer, setSelectedAnswer] = useState<
    GovernanceSelectedAnswer | undefined
  >();
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState<string | undefined>();

  const account = useMemo(() => hasVoted(), [hasVoted]);

  if (poll.status == 'closed' && account && !account.assetWithdrawn) {
    return (
      <Container title="Cast your vote" icon="/cast_vote.webp">
        <button
          disabled={loading}
          onClick={() => withdraw(poll.pollId, reload)}
          className="outline-none mt-6 border-2 text-white border-pinkBorder rounded-3xl py-4 text-sm font-semibold sm:text-base bg-pinkBorder"
        >
          Withdraw
        </button>
      </Container>
    );
  }

  if (poll.status == 'closed') {
    return (
      <Container title="Cast your vote" icon="/cast_vote.webp">
        <span className="text-grey">This poll is closed.</span>
      </Container>
    );
  }

  return (
    <>
      <Container title="Cast your vote" icon="/cast_vote.webp">
        <div className="gap-y-2 flex flex-col">
          {poll?.options?.map((option, index) => {
            return (
              <button
                key={option}
                onClick={() => {
                  if (!account) {
                    setSelectedAnswer({ answer: option, index: index + 1 });
                  }
                }}
                className={classNames(
                  'outline-none border-2 border-grey rounded-3xl py-4 text-sm font-semibold sm:text-base',
                  selectedAnswer?.answer === option
                    ? 'bg-grey text-white'
                    : 'bg-transparent text-grey',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {selectedAnswer && !account ? (
          <button
            onClick={async () => {
              if (selectedAccount) {
                const b = await getBalance();
                setBalance(b?.toString());
                setShowModal(true);
              } else {
                showErrorNotify(
                  'Please connect your wallet first.',
                  true,
                  TOAST_ID,
                );
              }
            }}
            className="outline-none mt-6 border-2 text-white border-pinkBorder rounded-3xl py-4 text-sm font-semibold sm:text-base bg-pinkBorder"
          >
            Vote
          </button>
        ) : null}
      </Container>
      <VotesModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        poll={poll}
        selectedAnswer={selectedAnswer!}
        balance={balance ?? '0'}
        vote={vote}
        loading={loading}
        reload={reload}
      />
    </>
  );
}
