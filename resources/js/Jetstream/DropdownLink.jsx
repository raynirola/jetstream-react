import {InertiaLink} from "@inertiajs/inertia-react";

const DropdownLink = ({href, as = 'inertia', ...props}) => {
    return (
        <>
            {as === 'button' &&
            <button type="submit"
                    className={`inline-flex w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-md transition ${props.className}`}>
                {props.children}
            </button>
            }

            {as === 'a' &&
            <a href={href}
               className={`block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-md transition ${props.className}`}>
                {props.children}
            </a>
            }

            {as === 'inertia' &&
            <InertiaLink href={href}
                         className={`block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-md transition ${props.className}`}>
                {props.children}
            </InertiaLink>
            }
        </>
    )
}

export default DropdownLink;

