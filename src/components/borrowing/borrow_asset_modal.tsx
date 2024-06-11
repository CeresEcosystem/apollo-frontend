import Modal from '@components/modal';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  BorrowingAssetFormData,
  BorrowingAssetSelectOption,
  BorrowingInfo,
  LendingInfo,
} from 'src/interfaces';
import AssetBalance from '@components/input/asset_balance';
import TransactionOverview from '@components/transaction/transaction_overview';
// import TransactionFee from '@components/transaction/transaction_fee';
import ModalButton from '@components/modal/modal_button';
import AssetSelect from '@components/input/asset_select';
import { ICONS_URL } from '@constants/index';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';
import useBorrowAsset from '@hooks/use_borrow_asset';
import usePrice from '@hooks/use_price';
import LoanToValue from '@components/table/load_to_value';

export default function BorrowAssetModal({
  showModal,
  closeModal,
  lendingInfo,
  borrowingInfo,
  reload,
}: {
  showModal: boolean;
  closeModal: () => void;
  lendingInfo: LendingInfo[];
  borrowingInfo: BorrowingInfo[];
  reload: () => void;
}) {
  const intl = useIntl();

  const [formData, setFormData] = useState<BorrowingAssetFormData>({
    asset: null,
    collateral: null,
    inputValue: '',
    price: 0,
  });

  const { loading, borrowAsset } = useBorrowAsset();

  const { getPriceForToken } = usePrice();

  const borrowingTokenPrice = useMemo(() => {
    if (formData.asset) {
      return getPriceForToken(formData.asset.value);
    }

    return 0;
  }, [getPriceForToken, formData.asset]);

  const collateralTokenPrice = useMemo(() => {
    if (formData.collateral) {
      return getPriceForToken(formData.collateral.value);
    }

    return 0;
  }, [getPriceForToken, formData.collateral]);

  const collateralAmount = useMemo(() => {
    if (formData.asset) {
      return (
        ((Number(formData.inputValue) / Number(formData.asset?.loanToValue)) *
          borrowingTokenPrice) /
        collateralTokenPrice
      );
    }

    return 0;
  }, [
    borrowingTokenPrice,
    collateralTokenPrice,
    formData.asset,
    formData.inputValue,
  ]);

  const maxBorrowingAmount = useMemo(() => {
    if (formData.asset && formData.collateral) {
      const cAmount =
        lendingInfo.find(
          lend => lend.poolAssetId === formData.collateral!.value,
        )?.amount ?? 0;

      return (
        (Number(cAmount) *
          collateralTokenPrice *
          Number(formData.asset?.loanToValue)) /
        borrowingTokenPrice
      );
    }

    return 0;
  }, [
    borrowingTokenPrice,
    collateralTokenPrice,
    formData.asset,
    formData.collateral,
    lendingInfo,
  ]);

  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setFormData({
          asset: null,
          collateral: null,
          inputValue: '',
          price: 0,
        });
      }, 500);
    }
  }, [showModal]);

  const options: BorrowingAssetSelectOption[] = borrowingInfo.map(asset => {
    return {
      label: asset.poolAssetSymbol,
      value: asset.poolAssetId,
      icon: `${ICONS_URL}${asset.poolAssetSymbol}.svg`,
      loanToValue: asset.loanToValue,
    };
  });

  const handleAssetChange = (
    selectedOption: BorrowingAssetSelectOption | null,
  ) => {
    if (selectedOption !== formData.asset) {
      setFormData(prevData => {
        return {
          asset: selectedOption,
          collateral:
            prevData.collateral?.value === selectedOption?.value
              ? null
              : prevData.collateral,
          inputValue: '',
          price: 0,
        };
      });
    }
  };

  const handleCorrateralChange = (
    selectedOption: BorrowingAssetSelectOption | null,
  ) => {
    if (selectedOption !== formData.collateral) {
      setFormData(prevData => {
        return {
          collateral: selectedOption,
          asset:
            prevData.asset?.value === selectedOption?.value
              ? null
              : prevData.asset,
          inputValue: '',
          price: 0,
        };
      });
    }
  };

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
    <Modal title="Borrow asset" showModal={showModal} closeModal={closeModal}>
      <AssetSelect
        options={options}
        selectedOption={formData.asset}
        handleChange={handleAssetChange}
      />
      <AssetSelect
        options={options}
        label="Select collateral"
        selectedOption={formData.collateral}
        handleChange={handleCorrateralChange}
        spaceTop
      />
      {formData.asset && formData.collateral && (
        <>
          <AssetBalance
            label="Amount"
            balance={formData.inputValue}
            assetSymbol={formData.asset?.label}
            handleAssetBalanceChange={handleAssetBalanceChange}
            price={formData.price}
            assetBalance={maxBorrowingAmount.toString()}
            onMaxPressed={onMaxPressed}
            note="Minimum amount is 10$"
          />
          <LoanToValue
            loan={`${priceFormat(intl, Number(formData.asset.loanToValue) * 100)}%`}
          />
          <TransactionOverview
            overviews={[
              {
                label: 'Collateral',
                info: `${priceFormat(intl, collateralAmount, 3)} ${formData.collateral.label}`,
              },
              {
                label: 'Max borrowing amount',
                info: `${priceFormat(intl, maxBorrowingAmount, 3)} ${formData.asset.label}`,
              },
            ]}
          />
        </>
      )}
      {/* <TransactionFee /> */}
      <ModalButton
        title="Borrow asset"
        onClick={() =>
          borrowAsset(
            formData.collateral!.value,
            formData.asset!.value,
            formData.inputValue,
            () => {
              reload();
              closeModal();
            },
          )
        }
        disabled={
          !formData.asset ||
          !formData.collateral ||
          Number(formData.inputValue) <= 0 ||
          Number(formData.inputValue) > maxBorrowingAmount ||
          loading ||
          formData.price < 10
        }
      />
    </Modal>
  );
}
