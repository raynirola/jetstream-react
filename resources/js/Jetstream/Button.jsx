const Button = ({ type = 'submit', ...props }) => {
    return (
        <button {...props} type={ type } className={`inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ${props.className }`}>
            {props.children}
        </button>
    )
}

export default Button;
