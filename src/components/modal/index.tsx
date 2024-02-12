import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export default function Modal({
  showModal,
  closeModal,
  title,
  children,
}: {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white rounded-3xl p-4 text-left shadow-xl transition-all w-full sm:max-w-lg sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-grey font-medium text-lg xxs:text-xl xs:text-2xl">
                    {title}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="outline-none"
                  >
                    <XMarkIcon className="h-6 w-6 text-grey" />
                  </button>
                </div>
                <div className="mt-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
