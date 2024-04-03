import Gradient from '@components/gradient';
import classNames from 'classnames';

const containerStyle =
  'h-44 rounded-2xl bg-white p-4 flex xs:p-6 xs:h-56 lg:h-44 lg:p-4 xl:h-56 2xl:p-6';
const titleStyle =
  'block text-grey font-bold leading-tight text-lg xxs:text-xl xs:text-2xl lg:text-xl xl:text-2xl';
const subtitleStyle =
  'tracking-widest font-semibold text-[10px] xxs:text-xs lg:text-[10px] xl:text-xs text-grey2';
const valueStyle =
  'text-grey font-bold text-2xl xxs:text-3xl xs:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl';

export default function Stats() {
  const renderValueLocked = () => {
    return (
      <div className="h-44 rounded-2xl overflow-hidden xs:h-56 lg:h-44 xl:h-56">
        <Gradient>
          <div className="p-4 flex flex-col h-full justify-between bg-[url('/earth.png')] bg-no-repeat bg-right-bottom xs:p-6 lg:p-4 xl:p-6">
            <div>
              <span className={classNames(titleStyle, 'text-white')}>
                LOCKED
              </span>
              <span
                className={classNames(
                  subtitleStyle,
                  'text-white text-opacity-50',
                )}
              >
                TOTAL VALUE
              </span>
            </div>
            <span className={classNames(valueStyle, 'text-white')}>
              $661.54M
            </span>
          </div>
        </Gradient>
      </div>
    );
  };

  const renderTotalLended = () => {
    return (
      <div
        className={classNames(
          containerStyle,
          "justify-between bg-[url('/total_lended.png')] bg-contain bg-no-repeat bg-bottom",
        )}
      >
        <span className={valueStyle}>$100M+</span>
        <div>
          <span className={titleStyle}>LENDED</span>
          <span className={subtitleStyle}>TOTAL</span>
        </div>
      </div>
    );
  };

  const renderTotalBorrowed = () => {
    return (
      <div
        className={classNames(
          containerStyle,
          "flex-col bg-[url('/total_borrowed.png')] bg-no-repeat bg-center",
        )}
      >
        <span className={valueStyle}>$150M+</span>
        <span className={subtitleStyle}>TOTAL BORROWED</span>
      </div>
    );
  };

  const renderActiveUsers = () => {
    return (
      <div
        className={classNames(
          containerStyle,
          "flex-col justify-between bg-[url('/total_users.png')] bg-[center_right_1rem] bg-[length:100px] xs:bg-auto lg:bg-[length:100px] xl:bg-auto bg-no-repeat",
        )}
      >
        <div>
          <span className={titleStyle}>USERS</span>
          <span className={subtitleStyle}>TOTAL ACTIVE</span>
        </div>
        <span className={valueStyle}>9,000+</span>
      </div>
    );
  };

  return (
    <div className="mt-6 w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-6">
      {renderValueLocked()}
      {renderTotalLended()}
      {renderTotalBorrowed()}
      {renderActiveUsers()}
    </div>
  );
}
