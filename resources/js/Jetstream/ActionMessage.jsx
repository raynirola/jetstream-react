import React from 'react';
import {Transition} from '@headlessui/react'

const ActionMessage = ({on, ...props}) => {
    return (
        <Transition
            {...props}
            as={'div'}
            show={on}
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className={`text-sm text-gray-600 ${props.className}`}
        >
            {props.children}
        </Transition>
    );
};

export default ActionMessage;
