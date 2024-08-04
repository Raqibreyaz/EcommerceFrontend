import { memo, Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

const SlidingWrapper = memo(function ({ isOpen, setIsOpen, children, className = '' }) {

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-40 md:hidden"
                onClose={setIsOpen}
            >
                {/* Overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
                </TransitionChild>

                {/* Sliding panel from the left */}
                <div className="fixed inset-0 z-40 flex">
                    <TransitionChild
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <DialogPanel
                            className="relative mr-auto bg-gray-800 flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-12 shadow-xl"
                        >
                            <button type='button' className='text-white relative'
                                onClick={() => setIsOpen(false)}
                            >
                                <XMarkIcon className='absolute m-2 right-0 size-8' />
                            </button>
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
});

export default SlidingWrapper;
