import { Popover } from '@headlessui/react';
import { useEffect } from 'react';

export default function Overlay() {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return <Popover.Overlay className="fixed inset-0 bg-black opacity-30 z-10" />;
}
