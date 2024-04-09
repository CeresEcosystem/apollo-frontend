export default function TransactionOverview() {
  return (
    <div className="flex-shrink-0 mt-8">
      <label className="block mb-1 text-grey">Transaction overview</label>
      <div className="mt-2">
        <div className="flex justify-between border border-border rounded-3xl py-2 px-8 text-grey font-medium">
          <span>Lending APR</span>
          <span>1.37%</span>
        </div>
      </div>
    </div>
  );
}
