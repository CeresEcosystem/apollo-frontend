import Modal from '@components/modal';
import Select from '@components/input/select';
import { ChangeEvent, useState } from 'react';
import { LendingAssetFormData } from 'src/interfaces';
import AssetBalance from '@components/input/asset_balance';
import TransactionOverview from '@components/transaction/transaction_overview';
import TransactionFee from '@components/transaction/transaction_fee';
import ModalButton from '@components/modal/modal_button';
import { DataItem } from '@components/borrowing';

export default function LendAssetModal({
  showModal,
  closeModal,
  assets,
}: {
  showModal: boolean;
  closeModal: () => void;
  assets: DataItem[];
}) {
  const [formData, setFormData] = useState<LendingAssetFormData>({
    asset: '',
  });

  const options = assets.map(asset => {
    return { label: asset.asset, value: asset.id.toString() };
  });

  return (
    <Modal title="Lend asset" showModal={showModal} closeModal={closeModal}>
      <Select
        id="asset"
        name="asset"
        selectedOption={formData.asset}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setFormData(prevData => ({
            ...prevData,
            asset: {
              label: e.target.options[e.target.selectedIndex].text,
              value: e.target.value,
            },
          }));
        }}
        label="Select asset"
        options={options}
      />
      <AssetBalance label="Amount" handleChange={() => {}} />
      <TransactionOverview />
      <TransactionFee />
      <ModalButton title="Lend asset" />
    </Modal>
  );
}
