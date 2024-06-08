import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import useWithdrawAsset from '@hooks/use_withdraw_asset';
// import TransactionFee from '@components/transaction/transaction_fee';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { LendingInfo, LendingWithdrawFormData } from 'src/interfaces';
import { useTokenPrice } from 'src/store';

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

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const tokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(token => token.assetId === asset?.poolAssetId)
        ?.price ?? 0
    );
  }, [pricesForAllTokens, asset?.poolAssetId]);

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
      {/* <TransactionFee /> */}
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
