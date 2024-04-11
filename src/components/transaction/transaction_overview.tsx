import { TransactionOverviewData } from 'src/interfaces';

export default function TransactionOverview({
  overviews,
  showLabel = true,
}: {
  overviews: TransactionOverviewData[];
  showLabel?: boolean;
}) {
  return (
    <div className="flex-shrink-0 mt-8">
      {showLabel && (
        <label className="block mb-1 text-grey">Transaction overview</label>
      )}
      <div className="mt-2 flex flex-col gap-y-1">
        {overviews.map(overview => (
          <div
            key={overview.label}
            className="flex justify-between border border-border rounded-3xl py-2 px-8 text-grey font-medium"
          >
            <span>{overview.label}</span>
            <span>{overview.info}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
