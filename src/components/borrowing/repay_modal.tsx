import AssetBalance from '@components/input/asset_balance';
import Modal from '@components/modal';
import ModalButton from '@components/modal/modal_button';
// import TransactionFee from '@components/transaction/transaction_fee';
import TransactionOverview from '@components/transaction/transaction_overview';
import useBalance from '@hooks/use_balance';
import useRepayAsset from '@hooks/use_repay_asset';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  BorrowingInfo,
  Collateral,
  RepayCollateralFormData,
} from 'src/interfaces';
import { useTokenPrice } from 'src/store';

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

  const { loading, repayAsset } = useRepayAsset();

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const [formData, setFormData] = useState<RepayCollateralFormData>({
    balance: '',
    inputValue: '',
    price: 0,
  });

  const tokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(token => token.assetId === asset?.poolAssetId)
        ?.price ?? 0
    );
  }, [pricesForAllTokens, asset?.poolAssetId]);

  const totalToRepay = useMemo(() => {
    if (collateral) {
      return collateral.borrowedAmount + collateral.interest;
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
    const maxValue = Math.min(Number(formData.balance), totalToRepay);

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
            assetBalance={formData.balance}
            handleAssetBalanceChange={handleAssetBalanceChange}
            onMaxPressed={onMaxPressed}
            price={formData.price}
          />
          <TransactionOverview
            overviews={[
              {
                label: 'Borrowed amount',
                info: `${collateral?.borrowedAmount} ${asset?.poolAssetSymbol}`,
              },
              {
                label: 'Interest',
                info: `${collateral?.interest} ${asset?.poolAssetSymbol}`,
              },
            ]}
          />
          <TransactionOverview
            showLabel={false}
            overviews={[
              {
                label: 'Total possible amount to repay',
                info: `${totalToRepay} ${asset?.poolAssetSymbol}`,
              },
            ]}
          />
        </>
      )}

      {/* <TransactionFee /> */}
      <ModalButton
        title="Repay"
        onClick={() =>
          repayAsset(
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
          Number(formData.inputValue) > Number(formData.balance) ||
          Number(formData.inputValue) > totalToRepay ||
          loading
        }
      />
    </Modal>
  );
}
