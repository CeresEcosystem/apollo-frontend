import classNames from 'classnames';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

const buttonStyle =
  'h-9 w-9 rounded-xl bg-white flex items-center border-2 border-pinkBorder justify-center p-1';

export default function ListPagination({
  currentPage,
  totalPages,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  small = false,
  topMargin = true,
}: {
  currentPage: number;
  totalPages: number;
  goToFirstPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToLastPage: () => void;
  small?: boolean;
  topMargin?: boolean;
}) {
  return (
    <div
      className={classNames(
        'flex space-x-2 justify-center sm:justify-end',
        topMargin && 'mt-8',
      )}
    >
      <button
        onClick={() => goToFirstPage()}
        className={classNames(buttonStyle, small && 'h-6 w-6')}
      >
        <ChevronDoubleLeftIcon className="text-pinkBorder" />
      </button>
      <button
        onClick={() => goToPreviousPage()}
        className={classNames(buttonStyle, small && 'h-6 w-6')}
      >
        <ChevronLeftIcon className="text-pinkBorder" />
      </button>
      <div
        className={classNames(
          'h-9 px-4 whitespace-nowrap border-2 border-pinkBorder bg-pinkBorder font-medium rounded-xl flex items-center',
          small && 'h-6',
        )}
      >
        <span
          className={classNames('text-white text-base', small && 'text-sm')}
        >{`${currentPage + 1} / ${totalPages}`}</span>
      </div>
      <button
        onClick={() => goToNextPage()}
        className={classNames(buttonStyle, small && 'h-6 w-6')}
      >
        <ChevronRightIcon className="text-pinkBorder" />
      </button>
      <button
        onClick={() => goToLastPage()}
        className={classNames(buttonStyle, small && 'h-6 w-6')}
      >
        <ChevronDoubleRightIcon className="text-pinkBorder" />
      </button>
    </div>
  );
}
