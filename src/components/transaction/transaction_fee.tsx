import usePrice from '@hooks/use_price';
import { priceFormat } from '@utils/helpers';
import { useIntl } from 'react-intl';

export default function TransactionFee({ fee }: { fee: number }) {
  const intl = useIntl();

  const { getPriceForToken } = usePrice();

  return (
    <div className="flex-shrink-0 mt-8 flex items-center gap-x-2">
      <img src="/fee.webp" className="h-4" />
      <span className="font-medium text-grey">{`Fee: ${priceFormat(intl, fee, 3)} XOR ~ ${priceFormat(intl, getPriceForToken('XOR') * fee, 3)}$`}</span>
    </div>
  );
}
