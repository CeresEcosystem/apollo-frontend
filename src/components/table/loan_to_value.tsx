import TooltipLoanToValueQuestion from './tooltip_loan_to_value';

export default function LoanToValue({
  maxLoan,
  ltv,
  setLTV,
}: {
  maxLoan: number;
  ltv: number;
  setLTV: (ltv: number) => void;
}) {
  return (
    <div className="mt-4">
      <div className="mb-1">
        <label className="text-grey">Loan-to-Value</label>
        <TooltipLoanToValueQuestion id="loan-to-value" />
      </div>
      <div className="flex">
        <input
          type="range"
          className="range-slider"
          value={ltv}
          onChange={e => setLTV(Number(e.target.value))}
          min={1}
          step={1}
          max={maxLoan}
        />
        <label className="ml-4 text-grey font-medium leading-3 min-w-10 text-center">{`${ltv}%`}</label>
      </div>
      <span className="text-xs text-grey2">{`Max loan to value: ${maxLoan}%`}</span>
    </div>
  );
}
