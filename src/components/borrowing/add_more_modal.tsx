import AssetBalance from '@components/input/asset_balance';
import AssetSelect from '@components/input/asset_select';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
// import TransactionFee from '@components/transaction/transaction_fee';
import TransactionOverview from '@components/transaction/transaction_overview';
import { ICONS_URL } from '@constants/index';
import useBorrowAsset from '@hooks/use_borrow_asset';
import { priceFormat } from '@utils/helpers';
import { ChangeEvent, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  BorrowingInfo,
  Collateral,
  CollateralAddMoreFormData,
  LendingInfo,
} from 'src/interfaces';
import { useTokenPrice } from 'src/store';

export default function AddMoreModal({
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
  const [formData, setFormData] = useState<CollateralAddMoreFormData>({
    inputValue: '',
    price: 0,
  });

  const intl = useIntl();

  const { loading, borrowAsset } = useBorrowAsset();

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const borrowingTokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(token => token.assetId === asset?.poolAssetId)
        ?.price ?? 0
    );
  }, [pricesForAllTokens, asset?.poolAssetId]);

  const collateralTokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(
        token => token.assetId === collateral?.collateralAssetId,
      )?.price ?? 0
    );
  }, [pricesForAllTokens, collateral?.collateralAssetId]);

  const collateralAmount = useMemo(() => {
    if (asset) {
      return (
        ((Number(formData.inputValue) / asset.loanToValue) *
          borrowingTokenPrice) /
        collateralTokenPrice
      );
    }

    return 0;
  }, [asset, borrowingTokenPrice, collateralTokenPrice, formData.inputValue]);

  const maxBorrowingAmount = useMemo(() => {
    if (asset) {
      const cAmount =
        lendingInfo.find(
          lend => lend.poolAssetId === collateral?.collateralAssetId,
        )?.amount ?? 0;

      return (
        (cAmount * collateralTokenPrice * asset.loanToValue) /
        borrowingTokenPrice
      );
    }

    return 0;
  }, [
    asset,
    lendingInfo,
    collateralTokenPrice,
    borrowingTokenPrice,
    collateral?.collateralAssetId,
  ]);

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
      title={`Add more ${asset?.poolAssetSymbol}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      {asset && collateral && (
        <>
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
          />
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
            spaceTop
            isDisabled
          />
          <AssetBalance
            label="Amount"
            balance={formData.inputValue}
            assetSymbol={asset.poolAssetSymbol}
            handleAssetBalanceChange={handleAssetBalanceChange}
            price={formData.price}
            assetBalance={maxBorrowingAmount.toString()}
            onMaxPressed={onMaxPressed}
            note="Minimum amount is 10$"
          />
          <TransactionOverview
            overviews={[
              {
                label: 'Collateral',
                info: `${priceFormat(intl, collateralAmount)} ${collateral.collateralAssetSymbol}`,
              },
              {
                label: 'Max borrowing amount',
                info: `${priceFormat(intl, maxBorrowingAmount)} ${asset.poolAssetSymbol}`,
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
          Number(formData.inputValue) > maxBorrowingAmount ||
          loading ||
          formData.price < 10
        }
      />
    </Modal>
  );
}