import { Keyring } from '@polkadot/api';
import moment from 'moment';

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

export const formatDateFromTimestamp = (timestamp: number) => {
  const date = moment(new Date(timestamp), 'YYYY-MM-DD HH:MM');
  return `${date.format('MMM DD, YYYY')} ${date.format('HH:mm')}`;
};
