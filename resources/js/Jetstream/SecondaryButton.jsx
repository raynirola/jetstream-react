import {forwardRef} from "react";

const SecondaryButton = forwardRef(({type, ...props}, focusRef) => {
    return (
        <button {...props} ref={focusRef}
                type={type}
                className={`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition ${props.className}`}>
            {props.children}
        </button>
    );
});

export default SecondaryButton;
