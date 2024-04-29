import Modal from '@components/modal';
import { TOAST_ID, TOKEN_NAME } from '@constants/index';
import { showErrorNotify } from '@utils/toast';
import { ChangeEvent, useState } from 'react';
import {
  GovernancePollDetails,
  GovernanceSelectedAnswer,
} from 'src/interfaces';

export default function VotesModal({
  showModal,
  closeModal,
  poll,
  selectedAnswer,
  balance,
  reload,
  vote,
  loading,
}: {
  showModal: boolean;
  closeModal: () => void;
  poll: GovernancePollDetails;
  selectedAnswer: GovernanceSelectedAnswer;
  balance: string;
  reload: () => void;
  vote: (
    pollId: string,
    amount: string,
    selectedAnswer: number,
    reload: () => void,
  ) => Promise<void>;
  loading: boolean;
}) {
  const [amount, setAmount] = useState('');

  return (
    <Modal showModal={showModal} title={'Confirm vote'} closeModal={closeModal}>
      <span className="text-grey">{`Are you sure you want to vote “${poll?.title}”?`}</span>
      <span className="text-sm text-pinkBorder block mt-2">
        This action cannot be undone.
      </span>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="text-grey2">Option</span>
          <span className="font-semibold text-grey max-w-[60%]">
            {selectedAnswer?.answer}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-grey2">Vote with</span>
          <div className="flex items-center gap-x-2">
            <input
              name="amount"
              className="bg-backgroundBody rounded-3xl py-1 focus:outline-pinkBorder focus:ring-pinkBorder px-3 text-base max-w-16"
              placeholder={'1'}
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
            />
            <span className="text-grey2">of</span>
            <span className="font-semibold text-grey max-w-[60%]">{`${balance} ${TOKEN_NAME}`}</span>
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={async () => {
          if (amount !== '') {
            const amountDouble = parseFloat(amount);

            if (amountDouble > 0 && amountDouble <= parseFloat(balance)) {
              await vote(poll?.pollId, amount, selectedAnswer?.index, reload);
              closeModal();
            } else {
              showErrorNotify(
                'You must enter a number less or equal to your balance',
                true,
                TOAST_ID,
              );
            }
          } else {
            showErrorNotify('You must enter a number value', true, TOAST_ID);
          }
        }}
        className="outline-none w-full mt-10 text-white rounded-3xl py-2 text-sm font-semibold sm:text-base bg-pinkBorder"
      >
        Vote
      </button>
    </Modal>
  );
}
