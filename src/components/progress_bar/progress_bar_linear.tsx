export default function ProgressBarLinear({ progress = 0 }) {
  return (
    <div className="flex items-center mt-2 gap-x-2">
      <span className="text-xs font-medium min-w-12 text-grey">
        {`${progress.toFixed(2)}%`}
      </span>
      <div className="h-4 bg-borderLight rounded-3xl relative w-full">
        <div
          style={{ width: `${progress}%` }}
          className="bg-pinkBorder absolute inset-0 rounded-3xl"
        />
      </div>
    </div>
  );
}
