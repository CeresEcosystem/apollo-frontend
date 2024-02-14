export default function Paragraph({
  paragraph,
  importantText,
}: {
  paragraph: string;
  importantText?: string;
}) {
  return (
    <p className="text-grey text-sm">
      {importantText && (
        <span className="text-grey font-medium">{importantText}</span>
      )}
      {paragraph}
    </p>
  );
}
