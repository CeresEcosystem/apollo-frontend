import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import usePrice from '@hooks/use_price';
import useWithdrawAsset from '@hooks/use_withdraw_asset';
import TransactionFee from '@components/transaction/transaction_fee';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { LendingInfo, LendingWithdrawFormData } from 'src/interfaces';
import { withdrawFee } from '@utils/xor_fee';

export default function WithdrawModal({
  showModal,
  closeModal,
  asset,
  reload,
}: {
  showModal: boolean;
  closeModal: () => void;
  asset: LendingInfo | null;
  reload: () => void;
}) {
  const [formData, setFormData] = useState<LendingWithdrawFormData>({
    inputValue: '',
    price: 0,
  });

  const { loading, withdrawAsset } = useWithdrawAsset();

  const { getPriceForToken } = usePrice();

  const tokenPrice = useMemo(() => {
    return asset ? getPriceForToken(asset.poolAssetId) : 0;
  }, [getPriceForToken, asset]);

  const handleAssetBalanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      inputValue: e.target.value,
      price: tokenPrice * Number(e.target.value),
    });
  };

  const onMaxPressed = () => {
    setFormData({
      inputValue: asset?.amount ?? '',
      price: tokenPrice * Number(asset?.amount),
    });
  };

  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setFormData({
          inputValue: '',
          price: 0,
        });
      }, 500);
    }
  }, [showModal]);

  return (
    <Modal
      title={`Withdraw ${asset?.poolAssetSymbol}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      {asset && (
        <AssetBalance
          balance={formData.inputValue}
          assetSymbol={asset.poolAssetSymbol}
          assetBalance={asset.amount}
          handleAssetBalanceChange={handleAssetBalanceChange}
          onMaxPressed={onMaxPressed}
          price={formData.price}
        />
      )}
      <TransactionFee fee={withdrawFee} />
      <ModalButton
        title="Withdraw"
        onClick={() =>
          withdrawAsset(asset!.poolAssetId, formData.inputValue, () => {
            reload();
            closeModal();
          })
        }
        disabled={
          !asset ||
          Number(formData.inputValue) <= 0 ||
          Number(formData.inputValue) > Number(asset.amount) ||
          loading
        }
      />
    </Modal>
  );
}
