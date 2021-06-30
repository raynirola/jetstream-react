import React, {useRef, useState} from 'react';
import {useForm} from "@inertiajs/inertia-react";
import DialogModal from "@/Jetstream/DialogModal";
import Input from "@/Jetstream/Input";
import InputError from "@/Jetstream/InputError";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import Button from "@/Jetstream/Button";

const ConfirmsPassword = (
    {
        title = "Confirm Password",
        content = "For your security, please confirm your password to continue.",
        button = "Confirm",
        children,
        onConfirmed
    }
) => {
    const [confirmingPassword, setConfirmingPassword] = useState(false)
    const [password, setPassword] = useState( '')
    const [error, setError] = useState( null)
    const [formProcessing, setFormProcessing] = useState(false)

    const passwordRef = useRef()

    const startConfirmingPassword = async () => {
        await getPasswordConfirmationStatus() ? onConfirmed() : setConfirmingPassword(true)
    }

    const getPasswordConfirmationStatus = async () => {
        return await fetch(route('password.confirmation')).then(promise => promise.json()).then(response => response.confirmed)
    }

    const confirmPassword = (event) => {
        event.preventDefault();

        setFormProcessing(true)

        axios.post(route('password.confirm'), {
            password: password
        }).then(() => {
            setFormProcessing(false)
            closeModal()
            onConfirmed()
        }).catch(error => {
            setFormProcessing(false)
            setError(error.response.data.errors.password[0])
            passwordRef.current.focus()
        });
    }

    const closeModal = () => {
        setConfirmingPassword(false)
        process.nextTick(() => {
            setError(null)
            setPassword(null)
        })
    }

    return (
        <div>
            <div onClick={startConfirmingPassword}>
                {children}
            </div>
            <DialogModal
                show={confirmingPassword}
                closeable={true}
                onClose={closeModal}
                ref={passwordRef}
                title={title}
                content={
                    <>
                        {content}
                        <div className="mt-4">
                            <form onSubmit={confirmPassword}>
                                <Input
                                    callback={(value) => setPassword(value)}
                                    type="password"
                                    value={password}
                                    className="mt-1 block w-3/4"
                                    placeholder="Password"
                                    ref={passwordRef}
                                />
                            </form>
                            <InputError error={error} className="mt-2"/>
                        </div>
                    </>
                }
                footer={
                    <>
                        <SecondaryButton
                            onClick={closeModal}
                            className={`${formProcessing && 'opacity-25'}`}
                            type={'button'}
                            disabled={formProcessing}>
                            Cancel
                        </SecondaryButton>

                        <Button
                            onClick={confirmPassword}
                            className={`ml-2 ${formProcessing && 'opacity-25'}`}
                            type={'button'}
                            disabled={formProcessing}>
                            {button}
                        </Button>
                    </>
                }
                width={'sm:max-w-2xl'}>

            </DialogModal>
        </div>
    );
};


export default ConfirmsPassword;
