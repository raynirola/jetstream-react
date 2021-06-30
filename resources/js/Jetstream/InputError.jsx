const InputError = ({error: message = []}) => {
    return (
        <>
            {
                message &&
                <div>
                    <p className="text-xs text-red-600 mt-0.5"> {message} </p>
                </div>
            }
        </>
    )
}

export default InputError;
