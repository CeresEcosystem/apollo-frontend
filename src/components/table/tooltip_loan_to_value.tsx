import { FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export default function TooltipLoanToValueQuestion({
  id = 'loan-to-value-question',
}: {
  id?: string;
}) {
  return (
    <>
      <FaQuestionCircle
        data-tooltip-id={id}
        className="cursor-pointer w-4 inline-block ml-2 text-grey"
      />
      <Tooltip
        id={id}
        content="The Loan to Value (“LTV”) ratio defines the maximum amount of assets that can be borrowed with a specific collateral. It is expressed as a percentage (e.g., at LTV=75%, for every 1 ETH worth of collateral, borrowers will be able to borrow 0.75 ETH worth of the corresponding currency."
        delayHide={1000}
        place="top"
        className="!bg-grey !rounded-3xl max-w-md text-wrap"
      />
    </>
  );
}
