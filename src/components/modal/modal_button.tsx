export default function ModalButton({
  title,
  onClick,
  disabled = false,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled
      className="w-full mt-12 text-white font-semibold text-xl bg-pinkModalButton rounded-3xl p-2 sm:p-4 disabled:bg-buttonDisabledBackground disabled:text-buttonDisabledTitle"
    >
      {title + (disabled ? ' (coming soon)' : ' (coming soon)')}
    </button>
  );
}
