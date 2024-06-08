import classNames from 'classnames';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const tableHeadStyle =
  'px-4 py-4 whitespace-nowrap text-center font-medium text-grey text-sm lg:px-6';
export const tableCellStyle = 'px-4 py-4 whitespace-nowrap lg:px-6 text-sm';
export const tableCellCollateralStyle = 'px-4 py-2 whitespace-nowrap lg:px-6';
export const tableButtonStyle =
  'rounded-3xl border border-pinkBorder font-semibold py-2 px-4 text-xs';
const buttonStyle =
  'rounded-3xl border-2 border-pinkBorder font-semibold py-2 px-6 text-xs xxs:text-sm';

export function TableContainer({
  title,
  firstButtonTitle,
  firstButtonCallback,
  secondButtonTitle,
  secondButtonCallback,
  topMargin = true,
  children,
}: {
  title?: string;
  firstButtonTitle?: string;
  firstButtonCallback?: () => void;
  secondButtonTitle?: string;
  secondButtonCallback?: () => void;
  topMargin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={topMargin ? 'mt-16' : 'mt-8'}>
        {title && (
          <h2 className="font-bold text-xl text-grey tracking-widest">
            {title}
          </h2>
        )}
        <div className="max-w-full overflow-x-auto">
          <table
            className={classNames(
              'bg-tableBackground relative rounded-2xl shadow-sm min-w-[768px] md:min-w-full overflow-hidden divide-y divide-borderTable',
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
  secondValue,
}: {
  value: string;
  trailing?: React.ReactNode;
  secondValue?: string;
}) {
  return (
    <div
      className={classNames(
        'flex bg-white items-center mx-auto w-min gap-x-2 border border-border rounded-3xl py-1',
        secondValue ? 'px-3' : 'px-2',
      )}
    >
      <div className="h-5 w-5 p-0.5 rounded-full flex-shrink-0 bg-pinkIcon flex items-center justify-center">
        <img src="/value_icon.webp" />
      </div>
      <div className="flex flex-col gap-y-0">
        <div className="flex items-center gap-x-2">
          <span className="font-medium text-grey text-xs">{value}</span>
          {trailing}
        </div>
        <span className="font-medium text-grey2 text-[10px] leading-4">
          {secondValue}
        </span>
      </div>
    </div>
  );
}
