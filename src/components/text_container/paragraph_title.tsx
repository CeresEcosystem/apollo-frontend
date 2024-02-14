export default function ParagraphTitle({ title }: { title: string }) {
  return (
    <h1 className="text-grey pt-16 font-medium text-lg md:text-xl">{title}</h1>
  );
}
