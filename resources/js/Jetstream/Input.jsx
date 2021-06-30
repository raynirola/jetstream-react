import {forwardRef} from "react";

const Input = forwardRef(({callback, ...props}, ref) => (
    <div>
        <input
            {...props}
            ref={ref}
            onChange={event => callback(event.target.value)}
            className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${props.className}`}/>
    </div>
))

export default Input;
