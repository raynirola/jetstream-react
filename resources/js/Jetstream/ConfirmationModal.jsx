import React, {forwardRef, useRef} from 'react';
import Modal from "@/Jetstream/Modal";
import {ExclamationIcon} from "@heroicons/react/outline";
import {Dialog} from "@headlessui/react";

const ConfirmationModal = forwardRef(({show, title, content, footer, width, onClose, closeable = false}, focusRef) => {
    return (
        <Modal open={show} width={width} closeable={closeable} onClose={onClose} ref={focusRef}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            {title}
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {footer}
            </div>
        </Modal>
    );
});

export default ConfirmationModal;
