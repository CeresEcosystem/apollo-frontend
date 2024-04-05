import classNames from 'classnames';

export default function PageFullscreen({
  showBackgroundImage = false,
  children,
}: {
  showBackgroundImage?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        'min-h-[calc(100vh-100px)] py-16 lg:py-20',
        showBackgroundImage
          ? "bg-[url('/bg_logo.webp')] bg-fixed bg-contain bg-no-repeat bg-right-bottom"
          : '',
      )}
    >
      {children}
    </div>
  );
}
