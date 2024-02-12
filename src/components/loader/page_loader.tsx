import Spinner from '@components/loader/spinner';

export default function PageLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
