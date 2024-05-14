import { Keyring } from '@polkadot/api';
import moment from 'moment';
import { IntlShape } from 'react-intl';
import multipliers, { Multiplier } from './multipliers';

export function getEncodedAddress(
  keyring: Keyring | null,
  address: string | undefined,
) {
  if (keyring && address) {
    return keyring.encodeAddress(address, 69);
  }

  return '';
}

export function formatWalletAddress(
  address: string | undefined,
  formatDelimiter = 8,
) {
  if (address && address.length > 20) {
    return `${address.substring(0, formatDelimiter)}...${address.substring(
      address.length - formatDelimiter,
      address.length,
    )}`;
  }

  return '';
}

export function getAvatarTitle(accountName: string | undefined) {
  if (accountName) {
    const nameSplit = accountName.split(' ');

    if (nameSplit.length > 1) {
      return (
        nameSplit[0].charAt(0).toUpperCase() +
        nameSplit[1].charAt(0).toUpperCase()
      );
    }

    return accountName.charAt(0);
  }

  return '';
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDateFromTimestamp(timestamp: number) {
  const date = moment(new Date(timestamp), 'YYYY-MM-DD HH:MM');
  return `${date.format('MMM DD, YYYY')} ${date.format('HH:mm')}`;
}

export const priceFormat = (
  intl: IntlShape,
  price: number | string,
  decimals = 2,
) => {
  if (price !== null) {
    const priceNumber = typeof price === 'string' ? Number(price) : price;

    return intl.formatNumber(priceNumber, {
      maximumFractionDigits: decimals,
      trailingZeroDisplay: 'stripIfInteger',
    });
  }

  return '0.00';
};

function isExistingMultiplier(
  multiplier: string,
): multiplier is keyof Multiplier {
  return Object.keys(multipliers).includes(multiplier);
}

export function parse(data?: string) {
  if (data) {
    const dataSplit = data?.split(' ');

    return dataSplit.length !== 1 && isExistingMultiplier(dataSplit[1])
      ? (parseFloat(dataSplit[0]) * multipliers[dataSplit[1]]).toFixed(2)
      : parseFloat(dataSplit[0]).toFixed(2);
  }

  return '0';
}
