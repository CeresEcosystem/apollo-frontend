export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1740px] w-full mx-auto px-5 py-5 md:py-12 xl:px-16">
      {children}
    </div>
  );
}
