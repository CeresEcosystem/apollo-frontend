export default function Container({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl border-2 border-borderLight">
      <span className="py-5 mx-5 inline-flex items-center text-lg text-grey font-bold">
        <img src={icon} className="mr-2" />
        {title}
      </span>
      <hr className="border border-borderLight" />
      <div className="flex flex-col p-5">{children}</div>
    </div>
  );
}
