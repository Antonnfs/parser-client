import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast';

export enum ModalType {
    error = "error",
    success = "success",
    info = "info"
};

interface Props {
    type: ModalType;
    title: String
    description: String;
}

  export default function showToast({type, title, description}: Props) {
    toast.custom((t) => (
        <>
        <Transition
                show={t.visible}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {type === ModalType.error && <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
                        {type === ModalType.success && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
                        {type === ModalType.info && <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />}
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{title}</p>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        <button
                          className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                              toast.dismiss(t.id)
                          }}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
        </>
      ), {
        duration: 6000,
    });
  }