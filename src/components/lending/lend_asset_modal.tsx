import Modal from '@components/modal';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  LendingAssetFormData,
  LendingAssetSelectOption,
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
import useBalance from '@hooks/use_balance';
import { useTokenPrice } from 'src/store';
import useLendAsset from '@hooks/use_lend_asset';

export default function LendAssetModal({
  showModal,
  closeModal,
  lendingInfo,
  reload,
}: {
  showModal: boolean;
  closeModal: () => void;
  lendingInfo: LendingInfo[];
  reload: () => void;
}) {
  const intl = useIntl();

  const { getBalanceForToken } = useBalance();

  const pricesForAllTokens = useTokenPrice(state => state.pricesForAllTokens);

  const { loading, lendAsset } = useLendAsset();

  const [formData, setFormData] = useState<LendingAssetFormData>({
    asset: null,
    balance: '',
    inputValue: '',
    price: 0,
  });

  const tokenPrice = useMemo(() => {
    return (
      pricesForAllTokens.find(token => token.assetId === formData.asset?.value)
        ?.price ?? 0
    );
  }, [pricesForAllTokens, formData.asset]);

  useEffect(() => {
    function fetchBalance() {
      getBalanceForToken(formData.asset!.value).then(balance => {
        setFormData(prevData => {
          return { ...prevData, balance };
        });
      });
    }

    if (formData.asset) {
      fetchBalance();
    }
  }, [formData.asset, getBalanceForToken]);

  const options: LendingAssetSelectOption[] = lendingInfo.map(asset => {
    return {
      label: asset.poolAssetSymbol,
      value: asset.poolAssetId,
      icon: `${ICONS_URL}${asset.poolAssetSymbol}.svg`,
      apr: asset.apr,
    };
  });

  const handleChange = (selectedOption: LendingAssetSelectOption | null) => {
    if (selectedOption !== formData.asset) {
      setFormData(prevData => {
        return {
          ...prevData,
          asset: selectedOption,
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
        price: tokenPrice * Number(e.target.value),
      };
    });
  };

  const onMaxPressed = () => {
    setFormData(prevData => {
      return {
        ...prevData,
        inputValue: formData.balance,
        price: tokenPrice * Number(formData.balance),
      };
    });
  };

  return (
    <Modal title="Lend asset" showModal={showModal} closeModal={closeModal}>
      <AssetSelect
        options={options}
        selectedOption={formData.asset}
        handleChange={handleChange}
      />
      {formData.asset && (
        <>
          <AssetBalance
            label="Amount"
            balance={formData.inputValue}
            assetSymbol={formData.asset?.label}
            assetBalance={formData.balance}
            handleAssetBalanceChange={handleAssetBalanceChange}
            onMaxPressed={onMaxPressed}
            price={formData.price}
            note="Minimum amount is 10$"
          />
          <TransactionOverview
            overviews={[
              {
                label: 'APR',
                info: `${priceFormat(intl, formData.asset?.apr)}%`,
              },
            ]}
          />
        </>
      )}
      {/* <TransactionFee /> */}
      <ModalButton
        title="Lend asset"
        onClick={() =>
          lendAsset(formData.asset!.value, formData.inputValue, () => {
            reload();
            closeModal();
          })
        }
        disabled={
          !formData.asset ||
          Number(formData.inputValue) <= 0 ||
          Number(formData.inputValue) > Number(formData.balance) ||
          loading ||
          formData.price < 10
        }
      />
    </Modal>
  );
}
