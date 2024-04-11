import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import TransactionFee from '@components/transaction/transaction_fee';
import TransactionOverview from '@components/transaction/transaction_overview';
import { BorrowingDataItem } from 'src/interfaces';

export default function RepayModal({
  showModal,
  closeModal,
  collateral,
}: {
  showModal: boolean;
  closeModal: () => void;
  collateral: BorrowingDataItem | null;
}) {
  return (
    <Modal
      title={`Repay ${collateral?.asset}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      <AssetBalance handleChange={() => {}} />
      <TransactionOverview
        overviews={[
          { label: 'Borrowed amount', info: '200 PSWAP' },
          { label: 'Interest', info: '50 PSWAP' },
        ]}
      />
      <TransactionOverview
        showLabel={false}
        overviews={[
          { label: 'Total possible amount to repay', info: '300 PSWAP' },
        ]}
      />
      <TransactionFee />
      <ModalButton title="Repay" />
    </Modal>
  );
}
