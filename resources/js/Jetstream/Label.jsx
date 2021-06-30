const Label = ({ value, ...props }) => {
    return (
        <label { ...props } className={`block font-medium text-sm text-gray-700 ${props.className}`} >
            { value ? <span> { value } </span> : <span> { props.children } </span> }
        </label>
    );
}

export default Label;
