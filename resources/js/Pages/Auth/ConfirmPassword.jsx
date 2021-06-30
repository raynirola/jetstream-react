import { useForm } from "@inertiajs/inertia-react";
import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import ValidationErrors from "@/Jetstream/ValidationErrors";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Button from "@/Jetstream/Button";

const ConfirmPassword = () => {

    const { data, setData, post, processing } = useForm({ password: '' })

    const submit = () => post(route('password.confirm'))

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo/>}>
            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <ValidationErrors className="mb-4"/>

            <form onSubmit={ event => { event.preventDefault(); submit() } }>
                <div>
                    <Label value="Password" htmlFor="password"/>
                    <Input callback={ value => setData("password", value) } id="password" type="password" value={ data.password } className="mt-1 block w-full" required={true} autoComplete="new-password"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className={ `ml-4 ${ processing && 'opacity-25' }` } disabled={ processing }>
                        Confirm
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    )
}

export default ConfirmPassword;
