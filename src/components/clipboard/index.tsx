import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from 'react-tooltip';

export default function Clipboard({
  id = 'clipboard',
  text,
  textToCopy,
  children,
}: {
  id?: string;
  text: string;
  textToCopy?: string;
  children: React.ReactNode;
}) {
  const handleChildClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <CopyToClipboard data-tooltip-id={id} text={textToCopy ?? text}>
        <div onClick={handleChildClick}>{children}</div>
      </CopyToClipboard>
      <Tooltip
        id={id}
        content="Copied!"
        openOnClick
        delayHide={1000}
        place="top"
        className="!bg-grey !rounded-3xl"
      />
    </>
  );
}
