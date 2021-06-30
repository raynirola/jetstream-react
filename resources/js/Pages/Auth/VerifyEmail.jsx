import { InertiaLink, useForm, usePage } from "@inertiajs/inertia-react";
import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import Button from "@/Jetstream/Button";

const VerifyEmail = () => {

    const { status } = usePage().props

    const { post, processing } = useForm({email: ''});

    const submit = () => post(route('verification.send'))

    const verificationLinkSent = () => status === 'verification-link-sent';

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo/>}>

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on
                the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {
                verificationLinkSent() &&
                <div className="mb-4 text-sm font-medium text-green-700 p-2 bg-green-50 rounded-md">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            }

            <form onSubmit={ event => { event.preventDefault(); submit() } }>
                <div className="flex items-center justify-between mt-4">
                    <Button className={ `${ processing && 'opacity-25' }` } disabled={ processing }>
                        { processing ? 'Loading' : 'Resend Verification Email' }
                    </Button>

                    <InertiaLink href={ route('logout') } method="post" as="button" className="underline text-sm text-gray-600 hover:text-gray-900">
                        Logout
                    </InertiaLink>
                </div>
            </form>
        </AuthenticationCard>
    )
}

export default VerifyEmail;
