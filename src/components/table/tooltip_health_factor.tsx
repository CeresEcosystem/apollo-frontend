import { FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export default function TooltipHealthFactorQuestion({
  id = 'health-factor',
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
        content="The Health Factor (HF) is the metric that quantifies the safety of a deposited asset compared to a borrowed asset. A higher HF value indicates greater safety against liquidation, protecting your collateral assets from being seized. When HF decreases to less than 1, your asset may be liquidated. A Health Factor below 1.30 triggers a warning sign."
        delayHide={1000}
        place="top"
        className="!bg-grey !rounded-3xl max-w-md text-wrap"
      />
    </>
  );
}
