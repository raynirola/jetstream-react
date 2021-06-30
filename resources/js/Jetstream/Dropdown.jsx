import {useState, useEffect} from "react";
import { Transition } from '@headlessui/react'

const Dropdown = ({ trigger, open: initialState = false, align = 'right', className, ...props}) => {

    const [ open, setOpen ] = useState(initialState);

    const [ alignmentClasses, setAlignmentClasses ] = useState('origin-top')

    useEffect(() => {
        if (align === 'right') setAlignmentClasses('origin-top-right right-0')
        else if (align === 'left') setAlignmentClasses('origin-top-left left-0')
    }, [])

    return (
        <div className="relative">
            <div onClick={ () => setOpen(!open) }> { trigger } </div>

            { open && <div className="fixed inset-0 z-40" onClick={ () => setOpen(false) }/> }

            <Transition
                show={ open }
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className={ `absolute z-50 mt-2 rounded-md shadow-lg ${ alignmentClasses }` }
                onClick={ () => setOpen(false) }>
                <div className={ `rounded-md ring-1 ring-black ring-opacity-5 p-2 bg-white ${ className }` }>
                    { props.children }
                </div>
            </Transition>
        </div>
    );
};

export default Dropdown;
