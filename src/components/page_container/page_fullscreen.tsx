export default function PageFullscreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-100px)] py-16 lg:py-20">{children}</div>
  );
}
