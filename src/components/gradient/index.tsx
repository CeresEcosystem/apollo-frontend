export default function Gradient({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-pinkDark from-10% via-pinkMedium via-30% to-pinkLight">
      {children}
    </div>
  );
}
