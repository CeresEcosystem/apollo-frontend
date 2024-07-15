import { ICONS_URL } from '@constants/index';
import { priceFormat } from '@utils/helpers';
import { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';

export default function AssetBalance({
  label,
  handleAssetBalanceChange,
  balance,
  assetSymbol,
  assetBalance,
  onMaxPressed = () => {},
  price,
  note,
  showBalance = true,
}: {
  label?: string; // eslint-disable-next-line no-unused-vars
  handleAssetBalanceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  balance: string;
  assetSymbol: string | undefined;
  assetBalance?: string | number;
  onMaxPressed?: () => void;
  price: number;
  note?: string;
  showBalance?: boolean;
}) {
  const intl = useIntl();

  return (
    <div className="flex-shrink-0 mt-4">
      {label !== '' && <label className="block mb-1 text-grey">{label}</label>}
      <div className="flex gap-x-4 justify-between bg-inputBackground border border-border rounded-3xl py-4 px-6">
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="0.00"
            value={balance}
            onChange={handleAssetBalanceChange}
            className="block font-medium text-xl sm:text-2xl w-full border-0 outline-none ring-0 bg-transparent text-grey placeholder:text-grey2 focus:outline-none"
          />
          <div className="max-w-32 truncate overflow-hidden">
            <span className="text-grey2 text-ellipsis text-xs sm:text-sm">{`$${priceFormat(intl, price)}`}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="flex items-center gap-x-2 font-semibold text-xl sm:text-2xl text-grey">
            <img src={`${ICONS_URL}${assetSymbol}.svg`} className="h-6 w-6" />
            {assetSymbol}
          </span>
          {showBalance && (
            <div className="flex items-center gap-x-2">
              <span className="text-grey2 text-xs sm:text-sm whitespace-nowrap">
                {`Balance: ${priceFormat(intl, Number(assetBalance), 3)}`}
              </span>
              <button
                onClick={() => onMaxPressed()}
                className="text-xs sm:text-sm font-medium text-grey"
              >
                MAX
              </button>
            </div>
          )}
        </div>
      </div>
      {note && <span className="text-xs text-grey2 mt-2">{note}</span>}
    </div>
  );
}
