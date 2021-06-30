import React, {useState} from 'react';
import {useForm, usePage} from "@inertiajs/inertia-react";
import ActionSection from "@/Jetstream/ActionSection";
import ConfirmsPassword from "@/Jetstream/ConfirmsPassword";
import Button from "@/Jetstream/Button";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import DangerButton from "@/Jetstream/DangerButton";

const TwoFactorAuthenticationForm = () => {
    const enableForm = useForm({})
    const disableForm = useForm({})

    const [enabling2FA, setEnabling2FA] = useState(false)
    const [disabling2FA, setDisabling2FA] = useState(false)
    const [QRCode, setQRCode] = useState('')
    const [recoveryCodes, setRecoveryCodes] = useState([])

    const twoFactorEnabled = () => {
        return !enabling2FA && usePage().props.user.two_factor_enabled
    }

    const enableTwoFactorAuthentication = () => {
        setEnabling2FA(true)
        enableForm.post('/user/two-factor-authentication', {
            preserveScroll: true,
            onSuccess: () => Promise.all([
                showQrCode(),
                showRecoveryCodes(),
            ]),
            onFinish: () => setEnabling2FA(false),
        })
    }

    const showQrCode = () => {
        return axios.get('/user/two-factor-qr-code')
            .then(response => setQRCode(response.data.svg))
    }

    const showRecoveryCodes = () => {
        return axios.get('/user/two-factor-recovery-codes')
            .then(response => setRecoveryCodes(response.data))
    }

    const regenerateRecoveryCodes = () => {
        axios.post('/user/two-factor-recovery-codes')
            .then(showRecoveryCodes)
    }

    const disableTwoFactorAuthentication = () => {
        setDisabling2FA(true)
        disableForm.delete('/user/two-factor-authentication', {
            preserveScroll: true,
            onSuccess: () => (setDisabling2FA(false)),
        })
    }

    return (
        <ActionSection
            title={"Two Factor Authentication"}
            description={" Add additional security to your account using two factor authentication."}>

            {twoFactorEnabled()
                ? <h3 className="text-lg font-medium text-gray-900">
                    You have enabled two factor authentication.
                </h3>
                :
                <h3 className="text-lg font-medium text-gray-900">
                    You have not enabled two factor authentication.
                </h3>
            }

            <div className="mt-3 max-w-xl text-sm text-gray-600">
                <p>
                    When two factor authentication is enabled, you will be prompted for a secure, random token during
                    authentication. You may retrieve this token from your phone's Google Authenticator application.
                </p>
            </div>

            {
                twoFactorEnabled() &&
                <div>
                    {
                        QRCode &&
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-gray-600">
                                <p className="font-semibold">
                                    Two factor authentication is now enabled. Scan the following QR code using your
                                    phone's authenticator application.
                                </p>
                            </div>

                            <div className="mt-4 dark:p-4 dark:w-56 dark:bg-white"
                                 dangerouslySetInnerHTML={{__html: QRCode}}>
                            </div>
                        </div>
                    }
                    {
                        recoveryCodes.length > 0 &&
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-gray-600">
                                <p className="font-semibold">
                                    Store these recovery codes in a secure password manager. They can be used to recover
                                    access to your account if your two factor authentication device is lost.
                                </p>
                            </div>

                            <div
                                className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
                                {recoveryCodes.map(code => <div key={code}>{code}</div>)}
                            </div>
                        </div>
                    }
                </div>
            }

            <div className="mt-5">
                {twoFactorEnabled() ?
                    <div className="flex items-center">
                        <ConfirmsPassword onConfirmed={regenerateRecoveryCodes}>
                            {
                                recoveryCodes.length > 0 &&
                                <SecondaryButton className="mr-3">
                                    Regenerate Recovery Codes
                                </SecondaryButton>
                            }
                        </ConfirmsPassword>

                        <ConfirmsPassword onConfirmed={showRecoveryCodes}>
                            {
                                recoveryCodes.length === 0 &&
                                <SecondaryButton className="mr-3">
                                    Show Recovery Codes
                                </SecondaryButton>
                            }
                        </ConfirmsPassword>

                        <ConfirmsPassword onConfirmed={disableTwoFactorAuthentication}>
                            <DangerButton className={`ml-2 ${disabling2FA && 'opacity-25'}`} disabled={disabling2FA}>
                                Disable
                            </DangerButton>
                        </ConfirmsPassword>
                    </div>
                    :
                    <ConfirmsPassword onConfirmed={enableTwoFactorAuthentication}>
                        <Button
                            className={`ml-2 ${enabling2FA && 'opacity-25'}`}
                            type={'button'}
                            disabled={enabling2FA}>
                            Enable
                        </Button>
                    </ConfirmsPassword>
                }

            </div>
        </ActionSection>
    );
};

export default TwoFactorAuthenticationForm;
