import AssetBalance from '@components/input/asset_balance';
import AssetSelect from '@components/input/asset_select';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import TransactionFee from '@components/transaction/transaction_fee';
import TransactionOverview from '@components/transaction/transaction_overview';
import { ICONS_URL } from '@constants/index';
import { useState } from 'react';
import {
  AssetSelectOption,
  BorrowingAssetFormData,
  BorrowingDataItem,
} from 'src/interfaces';

export default function AddMoreModal({
  showModal,
  closeModal,
  collateral,
  assets,
}: {
  showModal: boolean;
  closeModal: () => void;
  collateral: BorrowingDataItem | null;
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
    <Modal
      title={`Add more ${collateral?.asset}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      <AssetSelect
        options={options}
        label="Collateral"
        selectedOption={formData.collateral}
        handleChange={handleCorrateralChange}
        isDisabled
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
