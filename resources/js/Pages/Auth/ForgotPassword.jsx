import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import { useForm, usePage } from "@inertiajs/inertia-react"
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Button from "@/Jetstream/Button";
import ValidationErrors from "@/Jetstream/ValidationErrors";

const ForgotPassword = () => {

    const { status } = usePage().props

    const { data, setData, post, processing, reset} = useForm({ email: '' })

    const submit = () => post(route('password.email'), {onSuccess: () => reset("email")})

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo/>}>
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a
                password reset link that will allow you to choose a new one.
            </div>

            { status && <div className="mb-4 font-medium text-sm text-green-600"> { status } </div> }

            <ValidationErrors className="mb-4"/>

            <form onSubmit={ event => { event.preventDefault(); submit() } }>
                <div>
                    <Label value="Email" htmlFor="email"/>
                    <Input callback={ value => setData("email", value) } id="email" type="email" value={data.email} className="mt-1 block w-full" required={true} autoFocus autoComplete="username"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className={ `ml-4 ${ processing && 'opacity-25' }` } disabled={ processing }>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    )
}

export default ForgotPassword;
