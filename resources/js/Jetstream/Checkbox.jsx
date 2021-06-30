import {useState} from "react";

const Checkbox = ({checked: initial, callback, ...rest}) => {

    const [checked, setChecked] = useState(initial)

    const handleChange = (event) => {
        setChecked(!checked);
        callback(event.target.checked)
    }

    return (
        <input
            {...rest}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
    )
}

export default Checkbox;

