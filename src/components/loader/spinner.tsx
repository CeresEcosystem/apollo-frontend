export default function Spinner() {
  return (
    <div className="p-2 relative">
      <div className="absolute inset-6 rounded-full bg-pinkLight animate-ping" />
      <img src="/logo_bg.webp" alt="logo_bg_spinner" />
    </div>
  );
}
