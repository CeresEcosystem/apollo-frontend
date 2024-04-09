import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import TransactionFee from '@components/transaction/transaction_fee';
import { LendingDataItem } from 'src/interfaces';

export default function WithdrawModal({
  showModal,
  closeModal,
  asset,
}: {
  showModal: boolean;
  closeModal: () => void;
  asset: LendingDataItem | null;
}) {
  return (
    <Modal
      title={`Withdraw ${asset?.asset}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      <AssetBalance handleChange={() => {}} />
      <TransactionFee />
      <ModalButton title="Withdraw" />
    </Modal>
  );
}
