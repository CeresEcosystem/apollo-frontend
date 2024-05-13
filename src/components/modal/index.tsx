import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export default function Modal({
  showModal,
  closeModal,
  title,
  children,
  showCloseButton = true,
}: {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
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
        <div className="fixed inset-x-0 inset-y-12 z-10">
          <div className="flex h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white rounded-3xl py-4 text-left shadow-xl transition-all w-full sm:max-w-lg sm:py-6">
                <div className="flex px-4 items-center justify-between sm:px-6">
                  <h2 className="text-grey font-medium text-lg xxs:text-xl xs:text-2xl">
                    {title}
                  </h2>
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={closeModal}
                      className="outline-none"
                    >
                      <XMarkIcon className="h-6 w-6 text-grey" />
                    </button>
                  )}
                </div>
                <div className="mt-6 px-4 overflow-y-auto max-h-[calc(100vh-150px)] sm:px-6">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
