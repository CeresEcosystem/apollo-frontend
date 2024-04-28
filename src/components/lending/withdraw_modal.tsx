import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import TransactionFee from '@components/transaction/transaction_fee';
import { LendingInfo } from 'src/interfaces';

export default function WithdrawModal({
  showModal,
  closeModal,
  asset,
}: {
  showModal: boolean;
  closeModal: () => void;
  asset: LendingInfo | null;
}) {
  return (
    <Modal
      title={`Withdraw ${asset?.poolAssetSymbol}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      <AssetBalance
        assetSymbol={asset?.poolAssetSymbol}
        assetBalance={asset?.amount}
        handleChange={() => {}}
      />
      <TransactionFee />
      <ModalButton title="Withdraw" onClick={() => {}} />
    </Modal>
  );
}
