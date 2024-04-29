import PageContainer from '@components/page_container/page_container';
import StatsSkeleton from '@components/skeleton/stats_skeleton';
import TableSkeleton from '@components/skeleton/table_skeleton';

export default function Loader() {
  return (
    <PageContainer>
      <StatsSkeleton />
      <TableSkeleton showButtons={false} />
    </PageContainer>
  );
}
