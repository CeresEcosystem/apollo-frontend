import Modal from '@components/modal';
import { useState } from 'react';
import {
  BorrowingInfo,
  LendingInfo,
  LendingRewardsFormData,
  LendingRewardsSelectOption,
} from 'src/interfaces';
import TransactionOverview from '@components/transaction/transaction_overview';
// import TransactionFee from '@components/transaction/transaction_fee';
import ModalButton from '@components/modal/modal_button';
import AssetSelect from '@components/input/asset_select';
import { ICONS_URL, TOKEN_NAME } from '@constants/index';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';
import useRewards from '@hooks/use_rewards';

export default function RewardsModal({
  showModal,
  closeModal,
  assets,
  isLending,
  reload,
}: {
  showModal: boolean;
  closeModal: () => void;
  assets: LendingInfo[] | BorrowingInfo[];
  isLending: boolean;
  reload: () => void;
}) {
  const intl = useIntl();

  const [formData, setFormData] = useState<LendingRewardsFormData>({
    asset: null,
  });

  const { loading, getRewards } = useRewards();

  const options: LendingRewardsSelectOption[] = assets.map(asset => {
    return {
      label: asset.poolAssetSymbol,
      value: asset.poolAssetId,
      icon: `${ICONS_URL}${asset.poolAssetSymbol}.svg`,
      rewards: asset.rewards,
    };
  });

  const handleChange = (selectedOption: LendingRewardsSelectOption | null) => {
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
          overviews={[
            {
              label: 'Reward',
              info: `${priceFormat(intl, formData.asset.rewards, 3)} ${TOKEN_NAME.toUpperCase()}`,
            },
          ]}
        />
      )}
      {/* <TransactionFee /> */}
      <ModalButton
        title="Get rewards"
        onClick={() =>
          getRewards(formData.asset!.value, isLending, () => {
            reload();
            closeModal();
          })
        }
        disabled={
          !formData.asset || Number(formData.asset.rewards) <= 0 || loading
        }
      />
    </Modal>
  );
}
