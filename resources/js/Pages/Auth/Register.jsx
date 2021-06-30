import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import ValidationErrors from "@/Jetstream/ValidationErrors";
import {InertiaLink, useForm, usePage} from "@inertiajs/inertia-react";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Button from "@/Jetstream/Button";
import Checkbox from "@/Jetstream/Checkbox";

const Register = () => {
    const {hasTermsAndPrivacyPolicyFeature} = usePage().props.jetstream

    const { data, setData, post, processing } = useForm({ name: '', email: '', password: '', password_confirmation: '', terms: false })

    const submit = () => post(route('register'))

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo/>}>
            <ValidationErrors className="mb-4"/>

            <form onSubmit={event => {event.preventDefault(); submit()}}>
                <div>
                    <Label value="Name" htmlFor="name"/>
                    <Input callback={ value => setData("name", value) } id="name" type="text" value={ data.name } className="mt-1 block w-full" required={true} autoFocus autoComplete="full-name"/>
                </div>

                <div className="mt-4">
                    <Label value="Email" htmlFor="email"/>
                    <Input callback={ value => setData("email", value) } id="email" type="email" value={ data.email } className="mt-1 block w-full" required={true} autoComplete="username"/>
                </div>

                <div className="mt-4">
                    <Label value="Password" htmlFor="password"/>
                    <Input callback={ value => setData("password", value) } id="password" type="password" value={ data.password } className="mt-1 block w-full" required={true} autoComplete="new-password"/>
                </div>

                <div className="mt-4">
                    <Label value="Confirm Password" htmlFor="password_confirmation"/>
                    <Input callback={ value => setData("password_confirmation", value) } id="password_confirmation" type="password" value={ data.password_confirmation } className="mt-1 block w-full" required={true} autoComplete="new-password"/>
                </div>

                {hasTermsAndPrivacyPolicyFeature &&
                    <div className="mt-4">
                        <Label htmlFor="terms">
                            <div className="flex items-center">
                                <Checkbox callback={value => setData("terms", value)} name="terms" id="terms" />
                                <div className="ml-2">
                                    {'I agree to the '}
                                    <a target="_blank" href={route('terms.show')} className="underline text-sm text-gray-600 hover:text-gray-900">
                                        {'Terms of Service '}
                                    </a> {'and '}
                                    <a target="_blank" href={route('policy.show')} className="underline text-sm text-gray-600 hover:text-gray-900">
                                        {'Privacy Policy '}
                                    </a>
                                </div>
                            </div>
                        </Label>
                    </div>
                }

                <div className="flex items-center justify-end mt-4">
                    <InertiaLink href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </InertiaLink>

                    <Button className={ `ml-4 ${ processing && 'opacity-25' }` } disabled={ processing }>
                        Register
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default Register;
