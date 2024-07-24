import AssetBalance from '@components/input/asset_balance';
import AssetSelect from '@components/input/asset_select';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import LoanToValue from '@components/table/loan_to_value';
import TransactionFee from '@components/transaction/transaction_fee';
import TransactionOverview from '@components/transaction/transaction_overview';
import { ICONS_URL } from '@constants/index';
import { useTxFees } from '@context/tx_fees_context';
import useBorrowAsset from '@hooks/use_borrow_asset';
import usePrice from '@hooks/use_price';
import { priceFormat } from '@utils/helpers';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  BorrowingInfo,
  Collateral,
  BorrowMoreFormData,
  LendingInfo,
  FEE_TYPES,
} from 'src/interfaces';

export default function BorrowMoreModal({
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
  const [formData, setFormData] = useState<BorrowMoreFormData>({
    inputValue: '',
    price: 0,
    ltv: Number(asset?.loanToValue) * 100,
  });

  const intl = useIntl();

  const { loading, borrowAsset } = useBorrowAsset();

  const { getPriceForToken } = usePrice();

  const { getFee } = useTxFees();

  const borrowingTokenPrice = useMemo(() => {
    return asset ? getPriceForToken(asset.poolAssetId) : 0;
  }, [getPriceForToken, asset]);

  const collateralTokenPrice = useMemo(() => {
    return collateral ? getPriceForToken(collateral.collateralAssetId) : 0;
  }, [getPriceForToken, collateral]);

  const collateralAmount = useMemo(() => {
    if (asset) {
      return (
        (((Number(formData.inputValue) / (formData.ltv / 100)) *
          borrowingTokenPrice) /
          collateralTokenPrice) *
        0.99
      );
    }

    return 0;
  }, [
    asset,
    borrowingTokenPrice,
    collateralTokenPrice,
    formData.inputValue,
    formData.ltv,
  ]);

  const maxBorrowingAmount = useMemo(() => {
    if (asset) {
      const cAmount =
        lendingInfo.find(
          lend => lend.poolAssetId === collateral?.collateralAssetId,
        )?.amount ?? 0;

      return (
        ((Number(cAmount) * collateralTokenPrice * (formData.ltv / 100)) /
          borrowingTokenPrice) *
        0.99
      );
    }

    return 0;
  }, [
    asset,
    lendingInfo,
    collateralTokenPrice,
    formData.ltv,
    borrowingTokenPrice,
    collateral?.collateralAssetId,
  ]);

  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setFormData({
          inputValue: '',
          price: 0,
          ltv: 0,
        });
      }, 500);
    } else {
      setFormData(prevData => {
        return {
          ...prevData,
          ltv: Number(asset?.loanToValue) * 100,
        };
      });
    }
  }, [asset?.loanToValue, showModal]);

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
        inputValue: maxBorrowingAmount.toString(),
        price: borrowingTokenPrice * maxBorrowingAmount,
      };
    });
  };

  return (
    <Modal
      title={`Borrow more ${asset?.poolAssetSymbol}`}
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
            assetSymbol={asset.poolAssetSymbol}
            handleAssetBalanceChange={handleAssetBalanceChange}
            price={formData.price}
            assetBalance={maxBorrowingAmount}
            onMaxPressed={onMaxPressed}
            note="Minimum amount is 10$"
          />
          <LoanToValue
            ltv={formData.ltv}
            setLTV={(ltv: number) =>
              setFormData(prevData => ({ ...prevData, ltv }))
            }
            maxLoan={Number(asset.loanToValue) * 100}
          />
          <TransactionOverview
            overviews={[
              {
                label: 'Collateral',
                info: `${priceFormat(intl, collateralAmount, 3)} ${collateral.collateralAssetSymbol}`,
              },
              {
                label: 'Max borrowing amount',
                info: `${priceFormat(intl, maxBorrowingAmount, 3)} ${asset.poolAssetSymbol}`,
              },
            ]}
          />
        </>
      )}
      <TransactionFee fee={getFee(FEE_TYPES.Borrow)} />
      <ModalButton
        title="Borrow asset"
        onClick={() =>
          borrowAsset(
            collateral!.collateralAssetId,
            asset!.poolAssetId,
            formData.inputValue,
            formData.ltv,
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
          Number(formData.inputValue) > maxBorrowingAmount ||
          loading ||
          formData.price < 10
        }
      />
    </Modal>
  );
}
