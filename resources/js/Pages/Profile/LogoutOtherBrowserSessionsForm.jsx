import React, {useRef, useState} from 'react';
import ActionSection from "@/Jetstream/ActionSection";
import {DesktopComputerIcon, DeviceMobileIcon} from "@/Icons";
import Button from "@/Jetstream/Button";
import ActionMessage from "@/Jetstream/ActionMessage";
import DialogModal from "@/Jetstream/DialogModal";
import Input from "@/Jetstream/Input";
import InputError from "@/Jetstream/InputError";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import {useForm} from "@inertiajs/inertia-react";

const LogoutOtherBrowserSessionsForm = ({sessions}) => {

    const {data, setData, errors, delete: post, processing, recentlySuccessful, reset, clearErrors} = useForm({
        password: '',
    })
    const [confirmingLogout, setConfirmingLogout] = useState(false)
    const passwordRef = useRef()

    const confirmLogout = () => {
        setConfirmingLogout(true)
    }

    const handleClose = () => {
        setConfirmingLogout(false)
        clearErrors()
        reset()
    }

    const handleSubmit = event => {
        event.preventDefault();
        post(route('other-browser-sessions.destroy'), {
            preserveScroll: true,
            onSuccess: () => handleClose(),
            onError: () => passwordRef.current.focus(),
            onFinish: () => reset(),
        })
    }

    return (
        <ActionSection
            title={"Browser Sessions"}
            description={"Manage and log out your active sessions on other browsers and devices."}>
            <div className="max-w-xl text-sm text-gray-600">
                If necessary, you may log out of all of your other browser sessions across all of your devices. Some
                of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your
                account has been compromised, you should also update your password.
            </div>

            {
                sessions.length &&
                <div className="mt-5 space-y-6">
                    {sessions.map((session, index) => (
                        <div key={index} className="flex items-center">
                            <div>
                                {
                                    session.agent.is_desktop
                                        ? <DesktopComputerIcon className="w-8 h-8 text-gray-500"/>
                                        : <DeviceMobileIcon className="w-8 h-8 text-gray-500"/>
                                }
                            </div>

                            <div className="ml-3">
                                <div className="text-sm text-gray-600">
                                    {session.agent.platform} - {session.agent.browser}
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500">
                                        {`${session.ip_address} - `}
                                        {session.is_current_device
                                            ? <span className="text-green-500 font-semibold">This device</span>
                                            : <span>Last active {session.last_active}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

            <div className="flex items-center mt-5">
                <Button onClick={confirmLogout}>Log Out Other Browser Sessions</Button>
                <ActionMessage on={recentlySuccessful} className="ml-3">
                    Done.
                </ActionMessage>
            </div>

            <DialogModal
                onClose={handleClose}
                closeable={true}
                show={confirmingLogout}
                title={
                    <>
                        Log Out Other Browser Sessions
                    </>
                }
                content={
                    <>
                        <p className="text-sm">
                            Please enter your password to confirm you would like to log out of your other browser
                            sessions across all of your devices.
                        </p>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit}>
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
                            onClick={handleClose}
                            className={`${processing && 'opacity-25'}`}
                            type={'button'}
                            disabled={processing}>
                            Cancel
                        </SecondaryButton>

                        <Button
                            onClick={handleSubmit}
                            className={`ml-2 ${processing && 'opacity-25'}`}
                            type={'button'}
                            disabled={processing}>
                            Log Out Other Browser Sessions
                        </Button>
                    </>
                }
                width={'sm:max-w-2xl'}
            />
        </ActionSection>
    );
};

export default LogoutOtherBrowserSessionsForm;
