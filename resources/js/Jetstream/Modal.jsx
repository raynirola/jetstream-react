import React, {forwardRef, Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";

const Modal = forwardRef(({open = true, onClose, children, closeable = false, width = 'sm:max-w-lg'}, focusRef) => {

    const handleClose = () => {
        if (!closeable) return null;
        onClose()
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-20 inset-0 overflow-y-auto"
                open={open}
                initialFocus={focusRef}
                onClose={handleClose}>

                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">

                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity backdrop-filter backdrop-blur-md"/>
                    </Transition.Child>

                    <div className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</div>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div
                            className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${width} sm:w-full`}>
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
})

export default Modal;
