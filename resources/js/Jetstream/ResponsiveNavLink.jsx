import {useEffect, useState} from "react"
import {InertiaLink} from "@inertiajs/inertia-react"

const ResponsiveNavLink = ({href, active, as = 'inertia', ...props}) => {

    const [classNames, setClassNames] = useState('')

    useEffect(() => {
        setClassNames(
            active
                ? 'block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
                : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
        )
    }, [active])

    return (
        <>
            {as === 'button' &&
            <button {...props} className={`w-full text-left ${props.className} ${classNames}`}>
                {props.children}
            </button>
            }

            {as === 'inertia' &&
            <InertiaLink {...props} className={`${props.className} ${classNames}`} href={href}>
                {props.children}
            </InertiaLink>
            }
        </>
    )
}

export default ResponsiveNavLink;
