export default function Form({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-sm relative rounded-3xl w-full max-w-xl px-5 pb-12 pt-16 sm:pt-24 sm:px-12">
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full">
        <img src="/logo_bg.png" alt="logo_bg" className="h-20 sm:h-auto" />
      </div>
      {children}
    </div>
  );
}
