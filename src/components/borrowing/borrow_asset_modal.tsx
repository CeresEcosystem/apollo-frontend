import Modal from '@components/modal';
import { useState } from 'react';
import {
  AssetSelectOption,
  BorrowingAssetFormData,
  BorrowingDataItem,
} from 'src/interfaces';
import AssetBalance from '@components/input/asset_balance';
import TransactionOverview from '@components/transaction/transaction_overview';
import TransactionFee from '@components/transaction/transaction_fee';
import ModalButton from '@components/modal/modal_button';
import AssetSelect from '@components/input/asset_select';
import { ICONS_URL } from '@constants/index';

export default function BorrowAssetModal({
  showModal,
  closeModal,
  assets,
}: {
  showModal: boolean;
  closeModal: () => void;
  assets: BorrowingDataItem[];
}) {
  const [formData, setFormData] = useState<BorrowingAssetFormData>({
    asset: null,
    collateral: null,
  });

  const options: AssetSelectOption[] = assets.map(asset => {
    return {
      label: asset.asset,
      value: asset.id.toString(),
      icon: `${ICONS_URL}${asset.asset}.svg`,
    };
  });

  const handleAssetChange = (selectedOption: AssetSelectOption | null) => {
    if (selectedOption !== formData.asset) {
      setFormData(prevData => {
        return { ...prevData, asset: selectedOption };
      });
    }
  };

  const handleCorrateralChange = (selectedOption: AssetSelectOption | null) => {
    if (selectedOption !== formData.collateral) {
      setFormData(prevData => {
        return { ...prevData, collateral: selectedOption };
      });
    }
  };

  return (
    <Modal title="Borrow asset" showModal={showModal} closeModal={closeModal}>
      <AssetSelect
        options={options}
        label="Select collateral"
        selectedOption={formData.collateral}
        handleChange={handleCorrateralChange}
      />
      <AssetSelect
        options={options}
        selectedOption={formData.asset}
        handleChange={handleAssetChange}
        spaceTop
      />
      <AssetBalance label="Amount" handleChange={() => {}} />
      {formData.asset && formData.collateral && (
        <TransactionOverview
          overviews={[
            { label: 'Collateral', info: '100 XOR' },
            { label: 'Max borrowing amount', info: '150 PSWAP' },
          ]}
        />
      )}
      <TransactionFee />
      <ModalButton title="Borrow asset" />
    </Modal>
  );
}
