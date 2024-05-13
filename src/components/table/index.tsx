import classNames from 'classnames';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const tableHeadStyle =
  'px-4 py-4 text-center font-medium text-grey lg:px-6';
export const tableCellStyle = 'px-4 py-4 whitespace-nowrap lg:px-6';
export const tableCellCollateralStyle = 'px-4 py-2 whitespace-nowrap lg:px-6';
export const tableButtonStyle =
  'rounded-3xl border border-pinkBorder font-semibold py-2 px-4 text-xs';
const buttonStyle =
  'rounded-3xl border-2 border-pinkBorder font-semibold py-2 px-8 text-xs xxs:text-sm sm:text-base';

export function TableContainer({
  title,
  firstButtonTitle,
  firstButtonCallback,
  secondButtonTitle,
  secondButtonCallback,
  children,
}: {
  title?: string;
  firstButtonTitle?: string;
  firstButtonCallback?: () => void;
  secondButtonTitle?: string;
  secondButtonCallback?: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-16">
        {title && (
          <h2 className="font-bold text-xl text-grey tracking-widest">
            {title}
          </h2>
        )}
        <div className="max-w-full overflow-x-auto">
          <table
            className={classNames(
              'bg-tableBackground rounded-2xl shadow-sm min-w-[768px] md:min-w-full overflow-hidden divide-y divide-borderTable',
              title ? 'mt-5' : 'mt-0',
            )}
          >
            {children}
          </table>
        </div>
      </div>
      {firstButtonCallback && secondButtonCallback && (
        <div className="flex mt-6 gap-3 flex-col xxs:flex-row justify-center md:justify-end">
          <button
            onClick={firstButtonCallback}
            className={classNames(buttonStyle, 'bg-pinkBorder text-white')}
          >
            {firstButtonTitle}
          </button>
          <button
            onClick={secondButtonCallback}
            className={classNames(buttonStyle, 'bg-white text-pinkBorder')}
          >
            {secondButtonTitle}
          </button>
        </div>
      )}
    </>
  );
}

export function SortIcon({ direction }: { direction: string }) {
  return (
    <span className="ml-1">
      {direction === 'desc' ? (
        <FaCaretDown className="h-4 w-4 inline" />
      ) : (
        <FaCaretUp className="h-4 w-4 inline" />
      )}
    </span>
  );
}

export function IconContainer({
  value,
  trailing,
}: {
  value: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex bg-white items-center mx-auto w-min gap-x-2 border border-border rounded-3xl py-1 px-2">
      <div className="h-6 w-6 rounded-full flex-shrink-0 bg-pinkIcon flex items-center justify-center">
        <img src="/value_icon.webp" />
      </div>
      <span className="font-medium text-grey text-sm">{value}</span>
      {trailing}
    </div>
  );
}
