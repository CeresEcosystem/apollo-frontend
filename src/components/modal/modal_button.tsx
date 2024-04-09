export default function ModalButton({ title }: { title: string }) {
  return (
    <button className="w-full mt-12 text-white font-semibold text-xl bg-pinkModalButton rounded-3xl p-2 sm:p-4 disabled:bg-buttonDisabledBackground disabled:text-buttonDisabledTitle">
      {title}
    </button>
  );
}
