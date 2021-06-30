import { useState, useEffect } from "react"
import { usePage } from "@inertiajs/inertia-react"

const ValidationErrors = () => {
    const { errors } = usePage().props

    const [ hasErrors, setHasErrors ] = useState(Object.keys(errors).length > 0)

    useEffect(() => setHasErrors(Object.keys(errors).length > 0), [errors])

    return (
        <>
            { hasErrors &&
            <div className="mb-2">
                <ul className="mt-3 text-sm text-red-700 bg-red-50 rounded-md p-2.5">
                    {
                        Object.keys(errors).map((error, index) => <li key={index}>{errors[error]}</li>)
                    }
                </ul>
            </div>
            }
        </>
    )
}

export default ValidationErrors;
