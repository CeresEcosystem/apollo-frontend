export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1600px] w-full mx-auto px-5 py-5 md:pt-16 md:pb-28 xl:px-16">
      {children}
    </div>
  );
}
