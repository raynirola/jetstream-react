import {useForm} from "@inertiajs/inertia-react";

import Input from "@/Jetstream/Input";
import Label from "@/Jetstream/Label";
import Button from "@/Jetstream/Button";
import InputError from "@/Jetstream/InputError";
import FormSection from "@/Jetstream/FormSection";
import ActionMessage from "@/Jetstream/ActionMessage";
import {createRef} from "react";

const UpdatePasswordForm = (props) => {

    const {data, setData, errors, put, processing, recentlySuccessful, reset} = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const currentPasswordRef = createRef();
    const newPasswordRef = createRef();

    const updatePassword = () =>
        put(
            route('user-password.update'),
            {
                errorBag: 'updatePassword',
                preserveScroll: true,
                onSuccess: () => reset(),
            }
        )

    const actions =
        <>
            <ActionMessage on={recentlySuccessful} className="mr-3">
                Saved.
            </ActionMessage>
            <Button onClick={updatePassword} className={`${processing && 'opacity-25'}`}
                    type={'button'} disabled={processing}>
                Save
            </Button>
        </>


    return (
        <FormSection
            {...props}
            title={'Update Password'}
            description={'Ensure your account is using a long, random password to stay secure.'}
            actions={actions}
        >
            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="current_password" value="Current Password"/>
                <Input
                    ref={currentPasswordRef}
                    id="current_password"
                    type="password"
                    callback={(value) => setData("current_password", value)}
                    className="mt-1 block w-full"
                    value={data.current_password}
                    autoComplete="current-password"
                />
                <InputError error={errors.current_password} className="mt-2"/>
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="password" value="New Password"/>
                <Input
                    ref={newPasswordRef}
                    id="password"
                    type="password"
                    callback={(value) => setData("password", value)}
                    className="mt-1 block w-full"
                    value={data.password}
                    autoComplete="new-password"
                />
                <InputError error={errors.password} className="mt-2"/>
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="password_confirmation" value="Confirm Password"/>
                <Input
                    id="password_confirmation"
                    type="password"
                    callback={(value) => setData("password_confirmation", value)}
                    className="mt-1 block w-full"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                />
                <InputError error={errors.password_confirmation} className="mt-2"/>
            </div>

        </FormSection>
    );
}

export default UpdatePasswordForm;
