export default function TitleWithSubtitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-5 pb-16 lg:pb-20">
      <h1 className="text-grey font-bold text-3xl sm:text-4xl">{title}</h1>
      {subtitle && (
        <h3 className="text-grey pt-2 max-w-3xl md:text-lg">{subtitle}</h3>
      )}
    </div>
  );
}
