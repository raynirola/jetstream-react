import { useForm, usePage } from "@inertiajs/inertia-react";
import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import ValidationErrors from "@/Jetstream/ValidationErrors";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Button from "@/Jetstream/Button";

const ResetPassword = () => {
    const { email, token } = usePage().props

    const { data, setData, post, processing, reset } = useForm({ email: email, token: token, password: '', password_confirmation: '' })

    const submit = () => post(route('password.update'), {onSuccess: () => reset("password", "password_confirmation")})

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo/>}>
            <ValidationErrors className="mb-4"/>

            <form onSubmit={ event => { event.preventDefault(); submit() } }>
                <div>
                    <Label value="Email" htmlFor="email"/>
                    <Input callback={ value => setData("email", value) } id="email" type="email" value={ data.email } className="mt-1 block w-full" required={true} autoFocus autoComplete="username"/>
                </div>

                <div className="mt-4">
                    <Label value="Password" htmlFor="password"/>
                    <Input callback={ value => setData("password", value) } id="password" type="password" value={ data.password } className="mt-1 block w-full" required={true} autoComplete="current-password"/>
                </div>

                <div className="mt-4">
                    <Label value="Confirm Password" htmlFor="password_confirmation"/>
                    <Input callback={ value => setData("password_confirmation", value) } id="password_confirmation" type="password" value={ data.password_confirmation } className="mt-1 block w-full" required={true} autoComplete="new-password"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className={ `${ processing && 'opacity-25' }` } disabled={ processing }>
                        Reset Password
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    )
}

export default ResetPassword;
