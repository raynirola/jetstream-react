import React, {useRef, useState} from 'react';
import {useForm} from "@inertiajs/inertia-react";
import Button from "@/Jetstream/Button";
import DialogModal from "@/Jetstream/DialogModal";
import Input from "@/Jetstream/Input";
import InputError from "@/Jetstream/InputError";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import ActionSection from "@/Jetstream/ActionSection";
import DangerButton from "@/Jetstream/DangerButton";

const DeleteUserForm = () => {
    const {data, setData, errors, delete: post, processing, reset, clearErrors} = useForm({
        password: '',
    })
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordRef = useRef()

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)
        clearErrors()
        reset()
    }

    const deleteUser = event => {
        event.preventDefault();
        post(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordRef.current.focus(),
            onFinish: () => reset(),
        })
    }

    return (
        <ActionSection
            title={"Delete Account"}
            description={"Permanently delete your account."}>

            <div className="max-w-xl text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </div>

            <div className="mt-5">
                <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>
            </div>

            <DialogModal
                onClose={closeModal}
                closeable={true}
                show={confirmingUserDeletion}
                title={
                    <>
                        Delete Account
                    </>
                }
                content={
                    <>
                        <p className="text-sm">
                            Are you sure you want to delete your account? Once your account is deleted, all of its
                            resources and data will be permanently deleted. Please enter your password to confirm you
                            would like to permanently delete your account.
                        </p>
                        <div className="mt-4">
                            <form onSubmit={deleteUser}>
                                <Input
                                    callback={(value) => setData("password", value)}
                                    type="password"
                                    value={data.password}
                                    className="mt-1 block w-3/4"
                                    placeholder="Password"
                                    ref={passwordRef}
                                />
                            </form>
                            <InputError error={errors.password} className="mt-2"/>
                        </div>
                    </>
                }
                footer={
                    <>
                        <SecondaryButton
                            onClick={closeModal}
                            className={`${processing && 'opacity-25'}`}
                            type={'button'}
                            disabled={processing}>
                            Cancel
                        </SecondaryButton>

                        <Button
                            onClick={deleteUser}
                            className={`ml-2 ${processing && 'opacity-25'}`}
                            type={'button'}
                            disabled={processing}>
                            Delete Account
                        </Button>
                    </>
                }
                width={'sm:max-w-2xl'}
            />
        </ActionSection>
    );
};

export default DeleteUserForm;
