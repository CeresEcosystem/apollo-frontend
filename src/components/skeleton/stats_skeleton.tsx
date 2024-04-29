import Skeleton from 'react-loading-skeleton';

const skeletonStyle =
  'h-44 shadow-sm rounded-2xl overflow-hidden xs:h-56 lg:h-44 xl:h-56';

export default function StatsSkeleton() {
  return (
    <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-6">
      <Skeleton className={skeletonStyle} />
      <Skeleton className={skeletonStyle} />
      <Skeleton className={skeletonStyle} />
      <Skeleton className={skeletonStyle} />
    </div>
  );
}
