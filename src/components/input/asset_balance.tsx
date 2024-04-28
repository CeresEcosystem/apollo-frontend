import { ICONS_URL } from '@constants/index';
import { priceFormat } from '@utils/helpers';
import { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';

export default function AssetBalance({
  label,
  handleChange,
  assetSymbol,
  assetBalance,
}: {
  label?: string; // eslint-disable-next-line no-unused-vars
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  assetSymbol: string | undefined;
  assetBalance: number | undefined;
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
            onChange={handleChange}
            className="block font-medium text-xl sm:text-2xl w-full border-0 outline-none ring-0 bg-transparent text-grey placeholder:text-grey2 focus:outline-none"
          />
          <span className="text-grey2 text-xs sm:text-sm">$0</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="flex items-center gap-x-2 font-semibold text-xl sm:text-2xl text-grey">
            <img src={`${ICONS_URL}${assetSymbol}.svg`} className="h-6 w-6" />
            {assetSymbol}
          </span>
          <div className="flex items-center gap-x-2">
            <span className="text-grey2 text-xs sm:text-sm whitespace-nowrap">
              {`Balance: ${priceFormat(intl, assetBalance ?? 0, 3)}`}
            </span>
            <button className="text-xs sm:text-sm font-medium text-grey">
              MAX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
