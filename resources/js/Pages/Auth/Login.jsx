import { InertiaLink, useForm, usePage } from "@inertiajs/inertia-react";
import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Checkbox from "@/Jetstream/Checkbox";
import Button from "@/Jetstream/Button";
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import ValidationErrors from "@/Jetstream/ValidationErrors";

const Login = () => {

    const { status, canResetPassword } = usePage().props

    const { data, setData, post, processing } = useForm({ email: '', password: '', remember: false });

    const submit = () => post(route('login'))

    return (
        <AuthenticationCard logo={ <AuthenticationCardLogo/> }>
            { status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div> }

            <ValidationErrors className="mb-4"/>

            <form onSubmit={ event => { event.preventDefault(); submit() } }>
                <div>
                    <Label value="Email" htmlFor="email"/>
                    <Input className="mt-1 block w-full" id="email" type="email" value={ data.email } required={ true } autoFocus autoComplete="username" callback={ value => setData("email", value) }/>
                </div>

                <div className="mt-4">
                    <Label value="Password" htmlFor="password"/>
                    <Input className="mt-1 block w-full" id="password" type="password" value={ data.password } required={ true } autoComplete="current-password" callback={ value => setData("password", value) }/>
                </div>

                <div className="block mt-4">
                    <Label className="flex items-center">
                        <Checkbox checked={ data.remember } name="remember" callback={ value => setData("remember", value) }/>
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </Label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {
                        canResetPassword &&
                        <InertiaLink href={route('password.request')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Forgot your password?
                        </InertiaLink>
                    }

                    <Button className={ `ml-4 ${ processing && 'opacity-25' }` } disabled={ processing }>
                        Login
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    )
}

export default Login;
