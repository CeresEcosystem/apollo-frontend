import Modal from '@components/modal';
import { useState } from 'react';
import {
  LendingAssetFormData,
  LendingAssetSelectOption,
  LendingInfo,
} from 'src/interfaces';
import AssetBalance from '@components/input/asset_balance';
import TransactionOverview from '@components/transaction/transaction_overview';
import TransactionFee from '@components/transaction/transaction_fee';
import ModalButton from '@components/modal/modal_button';
import AssetSelect from '@components/input/asset_select';
import { ICONS_URL } from '@constants/index';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';

export default function LendAssetModal({
  showModal,
  closeModal,
  lendingInfo,
}: {
  showModal: boolean;
  closeModal: () => void;
  lendingInfo: LendingInfo[];
}) {
  const intl = useIntl();

  const [formData, setFormData] = useState<LendingAssetFormData>({
    asset: null,
  });

  const options: LendingAssetSelectOption[] = lendingInfo.map(asset => {
    return {
      label: asset.poolAssetSymbol,
      value: asset.poolAssetId,
      icon: `${ICONS_URL}${asset.poolAssetSymbol}.svg`,
      balance: asset.amount,
      apr: asset.apr,
    };
  });

  const handleChange = (selectedOption: LendingAssetSelectOption | null) => {
    if (selectedOption !== formData.asset) {
      setFormData(prevData => {
        return { ...prevData, asset: selectedOption };
      });
    }
  };

  return (
    <Modal title="Lend asset" showModal={showModal} closeModal={closeModal}>
      <AssetSelect
        options={options}
        selectedOption={formData.asset}
        handleChange={handleChange}
      />
      {formData.asset && (
        <>
          <AssetBalance
            label="Amount"
            assetSymbol={formData.asset?.label}
            assetBalance={formData.asset?.balance}
            handleChange={() => {}}
          />
          <TransactionOverview
            overviews={[
              {
                label: 'APR',
                info: `${priceFormat(intl, formData.asset?.apr)}%`,
              },
            ]}
          />
        </>
      )}
      <TransactionFee />
      <ModalButton
        title="Lend asset"
        onClick={() => {}}
        disabled={!formData.asset}
      />
    </Modal>
  );
}
