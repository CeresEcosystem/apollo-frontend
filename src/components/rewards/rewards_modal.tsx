import Modal from '@components/modal';
import { useState } from 'react';
import {
  AssetSelectOption,
  LendingAssetFormData,
  LendingDataItem,
} from 'src/interfaces';
import TransactionOverview from '@components/transaction/transaction_overview';
import TransactionFee from '@components/transaction/transaction_fee';
import ModalButton from '@components/modal/modal_button';
import AssetSelect from '@components/input/asset_select';
import { ICONS_URL } from '@constants/index';

export default function RewardsModal({
  showModal,
  closeModal,
  assets,
}: {
  showModal: boolean;
  closeModal: () => void;
  assets: LendingDataItem[];
}) {
  const [formData, setFormData] = useState<LendingAssetFormData>({
    asset: null,
  });

  const options: AssetSelectOption[] = assets.map(asset => {
    return {
      label: asset.asset,
      value: asset.id.toString(),
      icon: `${ICONS_URL}${asset.asset}.svg`,
    };
  });

  const handleChange = (selectedOption: AssetSelectOption | null) => {
    if (selectedOption !== formData.asset) {
      setFormData(prevData => {
        return { ...prevData, asset: selectedOption };
      });
    }
  };

  return (
    <Modal title="Rewards" showModal={showModal} closeModal={closeModal}>
      <AssetSelect
        options={options}
        selectedOption={formData.asset}
        handleChange={handleChange}
        label="Select pool"
      />
      {formData.asset && (
        <TransactionOverview
          overviews={[{ label: 'Reward', info: '20 Apollo' }]}
        />
      )}
      <TransactionFee />
      <ModalButton title="Get rewards" />
    </Modal>
  );
}
