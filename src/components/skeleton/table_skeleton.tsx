import Skeleton from 'react-loading-skeleton';

export default function TableSkeleton({
  title,
  showButtons = true,
}: {
  title?: string;
  showButtons?: boolean;
}) {
  return (
    <>
      <div className="mt-16">
        {title && (
          <h2 className="font-bold text-xl text-grey tracking-widest">
            {title}
          </h2>
        )}
        <Skeleton height={250} className="mt-5 rounded-2xl" />
      </div>
      {showButtons && (
        <div className="flex mt-6 gap-3 flex-col xxs:flex-row justify-center md:justify-end">
          <Skeleton width={150} height={40} className="rounded-3xl" />
          <Skeleton width={150} height={40} className="rounded-3xl" />
        </div>
      )}
    </>
  );
}
