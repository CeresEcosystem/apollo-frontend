import Modal from '@components/modal';
import { ChangeEvent, useMemo, useState } from 'react';
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
import { useTokenPrice } from 'src/store';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';
import useBorrowAsset from '@hooks/use_borrow_asset';

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

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const borrowingTokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(token => token.assetId === formData.asset?.value)
        ?.price ?? 0
    );
  }, [pricesForAllTokens, formData.asset]);

  const collateralTokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(
        token => token.assetId === formData.collateral?.value,
      )?.price ?? 0
    );
  }, [pricesForAllTokens, formData.collateral]);

  const collateralAmount = useMemo(() => {
    if (formData.collateral) {
      return (
        lendingInfo.find(
          lend => lend.poolAssetId === formData.collateral!.value,
        )?.amount ?? 0
      );
    }

    return 0;
  }, [formData.collateral, lendingInfo]);

  const maxBorrowingAmount = useMemo(() => {
    if (formData.asset) {
      return (
        (collateralAmount *
          collateralTokenPrice *
          formData.asset?.loanToValue) /
        borrowingTokenPrice
      );
    }

    return 0;
  }, [
    borrowingTokenPrice,
    collateralAmount,
    collateralTokenPrice,
    formData.asset,
  ]);

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
      {formData.asset && formData.collateral && (
        <>
          <AssetBalance
            label="Amount"
            balance={formData.inputValue}
            assetSymbol={formData.asset?.label}
            handleAssetBalanceChange={handleAssetBalanceChange}
            price={formData.price}
            note="Minimum amount is 10$"
            showBalance={false}
          />
          <TransactionOverview
            overviews={[
              {
                label: 'Collateral',
                info: `${priceFormat(intl, collateralAmount)} ${formData.collateral.label}`,
              },
              {
                label: 'Max borrowing amount',
                info: `${priceFormat(intl, maxBorrowingAmount)} ${formData.asset.label}`,
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
