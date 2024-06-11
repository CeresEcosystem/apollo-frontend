import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
import TransactionFee from '@components/transaction/transaction_fee';
import TransactionOverview from '@components/transaction/transaction_overview';
import useBalance from '@hooks/use_balance';
import usePrice from '@hooks/use_price';
import useRepayAsset from '@hooks/use_repay_asset';
import { priceFormat } from '@utils/helpers';
import { repayFee } from '@utils/xor_fee';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  BorrowingInfo,
  Collateral,
  RepayCollateralFormData,
} from 'src/interfaces';

export default function RepayModal({
  showModal,
  closeModal,
  asset,
  collateral,
  reload,
}: {
  showModal: boolean;
  closeModal: () => void;
  asset: BorrowingInfo | null;
  collateral: Collateral | null;
  reload: () => void;
}) {
  const { getBalanceForToken } = useBalance();

  const intl = useIntl();

  const { loading, repayAsset } = useRepayAsset();

  const { getPriceForToken } = usePrice();

  const [formData, setFormData] = useState<RepayCollateralFormData>({
    balance: 0,
    inputValue: '',
    price: 0,
  });

  const tokenPrice = useMemo(() => {
    return asset ? getPriceForToken(asset.poolAssetId) : 0;
  }, [getPriceForToken, asset]);

  const totalToRepay = useMemo(() => {
    if (collateral) {
      return Number(collateral.borrowedAmount) + Number(collateral.interest);
    }

    return 0;
  }, [collateral]);

  useEffect(() => {
    function fetchBalance() {
      getBalanceForToken(asset!.poolAssetId).then(balance => {
        setFormData(prevData => {
          return { ...prevData, balance };
        });
      });
    }

    if (asset?.poolAssetId) {
      fetchBalance();
    }
  }, [asset, getBalanceForToken]);

  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setFormData({
          balance: 0,
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
        price: tokenPrice * Number(e.target.value),
      };
    });
  };

  const onMaxPressed = () => {
    const maxValue = Math.min(formData.balance, totalToRepay);

    setFormData(prevData => {
      return {
        ...prevData,
        inputValue: maxValue.toString(),
        price: tokenPrice * maxValue,
      };
    });
  };

  return (
    <Modal
      title={`Repay ${asset?.poolAssetSymbol}`}
      showModal={showModal}
      closeModal={closeModal}
    >
      {collateral && asset && (
        <>
          <AssetBalance
            label="Amount"
            balance={formData.inputValue}
            assetSymbol={asset.poolAssetSymbol}
            assetBalance={priceFormat(intl, formData.balance, 3)}
            handleAssetBalanceChange={handleAssetBalanceChange}
            onMaxPressed={onMaxPressed}
            price={formData.price}
          />
          <TransactionOverview
            overviews={[
              {
                label: 'Borrowed amount',
                info: `${priceFormat(intl, collateral.borrowedAmount, 3)} ${asset.poolAssetSymbol}`,
              },
              {
                label: 'Interest',
                info: `${priceFormat(intl, collateral.interest, 3)} ${asset.poolAssetSymbol}`,
              },
            ]}
          />
          <TransactionOverview
            showLabel={false}
            overviews={[
              {
                label: 'Total possible amount to repay',
                info: `${priceFormat(intl, totalToRepay, 3)} ${asset.poolAssetSymbol}`,
              },
            ]}
          />
        </>
      )}

      <TransactionFee fee={repayFee} />
      <ModalButton
        title="Repay"
        onClick={() =>
          repayAsset(
            collateral!.collateralAssetId,
            asset!.poolAssetId,
            formData.inputValue,
            Math.min(formData.balance, totalToRepay),
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
          Number(formData.inputValue) > formData.balance ||
          Number(formData.inputValue) > totalToRepay ||
          loading
        }
      />
    </Modal>
  );
}
