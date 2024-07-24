import AssetBalance from '@components/input/asset_balance';
import AssetSelect from '@components/input/asset_select';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import TransactionFee from '@components/transaction/transaction_fee';
import { ICONS_URL } from '@constants/index';
import { useTxFees } from '@context/tx_fees_context';
import useAddCollateral from '@hooks/use_add_collateral';
import usePrice from '@hooks/use_price';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  BorrowingInfo,
  Collateral,
  LendingInfo,
  AddCollateralFormData,
  FEE_TYPES,
} from 'src/interfaces';

export default function AddCollateralModal({
  showModal,
  closeModal,
  asset,
  lendingInfo,
  collateral,
  reload,
}: {
  showModal: boolean;
  closeModal: () => void;
  asset: BorrowingInfo | null;
  lendingInfo: LendingInfo[];
  collateral: Collateral | null;
  reload: () => void;
}) {
  const [formData, setFormData] = useState<AddCollateralFormData>({
    inputValue: '',
    price: 0,
  });

  const { loading, addCollateral } = useAddCollateral();

  const { getPriceForToken } = usePrice();

  const { getFee } = useTxFees();

  const borrowingTokenPrice = useMemo(() => {
    return collateral ? getPriceForToken(collateral.collateralAssetId) : 0;
  }, [getPriceForToken, collateral]);

  const maxCollateralAmount = useMemo(() => {
    if (asset) {
      const cAmount =
        lendingInfo.find(
          lend => lend.poolAssetId === collateral?.collateralAssetId,
        )?.amount ?? '0';

      return Number(cAmount);
    }

    return 0;
  }, [asset, lendingInfo, collateral?.collateralAssetId]);

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

  const handleAssetBalanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => {
      return {
        ...prevData,
        inputValue: e.target.value,
        price: borrowingTokenPrice * Number(e.target.value),
      };
    });
  };

  const onMaxPressed = () => {
    setFormData(prevData => {
      return {
        ...prevData,
        inputValue: maxCollateralAmount.toString(),
        price: borrowingTokenPrice * maxCollateralAmount,
      };
    });
  };

  return (
    <Modal
      title={`Add collateral ${collateral?.collateralAssetSymbol}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      {asset && collateral && (
        <>
          <AssetSelect
            options={[
              {
                label: asset.poolAssetSymbol,
                value: asset.poolAssetId,
                icon: `${ICONS_URL}${asset.poolAssetSymbol}.svg`,
              },
            ]}
            selectedOption={{
              label: asset.poolAssetSymbol,
              value: asset.poolAssetId,
              icon: `${ICONS_URL}${asset.poolAssetSymbol}.svg`,
            }}
            isDisabled
          />
          <AssetSelect
            options={[
              {
                label: collateral.collateralAssetSymbol,
                value: collateral.collateralAssetId,
                icon: `${ICONS_URL}${collateral.collateralAssetSymbol}.svg`,
              },
            ]}
            label="Collateral"
            selectedOption={{
              label: collateral.collateralAssetSymbol,
              value: collateral.collateralAssetId,
              icon: `${ICONS_URL}${collateral.collateralAssetSymbol}.svg`,
            }}
            isDisabled
            spaceTop
          />
          <AssetBalance
            label="Amount"
            balance={formData.inputValue}
            assetSymbol={collateral.collateralAssetSymbol}
            handleAssetBalanceChange={handleAssetBalanceChange}
            price={formData.price}
            assetBalance={maxCollateralAmount}
            onMaxPressed={onMaxPressed}
          />
        </>
      )}
      <TransactionFee fee={getFee(FEE_TYPES.Lend)} />
      <ModalButton
        title="Add collateral"
        onClick={() =>
          addCollateral(
            collateral!.collateralAssetId,
            asset!.poolAssetId,
            formData.inputValue,
            () => {
              reload();
              closeModal();
            },
          )
        }
        disabled={
          !asset ||
          !collateral ||
          Number(formData.inputValue) <= 0 ||
          Number(formData.inputValue) > maxCollateralAmount ||
          loading
        }
      />
    </Modal>
  );
}
