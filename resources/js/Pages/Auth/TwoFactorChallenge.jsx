import React, {useEffect, useRef, useState} from 'react';
import AuthenticationCard from "@/Jetstream/AuthenticationCard";
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";
import ValidationErrors from "@/Jetstream/ValidationErrors";
import {useForm} from "@inertiajs/inertia-react";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Button from "@/Jetstream/Button";

const TwoFactorChallenge = () => {
    const [recoveryCodeMode, setRecoveryCodeMode] = useState(false)
    const {setData, processing, post, reset} = useForm({code: '', recoveryCode: ''})
    const recoveryCodeInputRef =  useRef()
    const authCodeInputRef =  useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        post(route('two-factor.login'))
    }

    const toggleRecoveryMode = () => {
        reset()
        setRecoveryCodeMode (!recoveryCodeMode)

        if (recoveryCodeMode) {
            recoveryCodeInputRef.current.focus()
            recoveryCodeInputRef.current.value = ''
        }else {
            authCodeInputRef.current.focus()
            authCodeInputRef.current.value = ''
        }
    }

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo/>}>
            <div className="mb-4 text-sm text-gray-600">
                {recoveryCodeMode
                    ? 'Please confirm access to your account by entering one of your emergency recovery codes.'

                    : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
                }
            </div>
            <ValidationErrors className="mb-4"/>

            <form onSubmit={handleSubmit}>
                {
                    recoveryCodeMode
                        ?
                        <>
                            <Label htmlFor="recovery_code" value="Recovery Code"/>
                            <Input
                                callback={value => setData("recoveryCode", value)}
                                id="recovery_code"
                                type="text"
                                inputMode="numeric"
                                className="mt-1 block w-full"
                                autoComplete="one-time-code"
                                ref={recoveryCodeInputRef}
                            />
                        </>
                        :
                        <>
                            <Label htmlFor="code" value="Code"/>
                            <Input
                                callback={value => setData("code", value)}
                                id="code"
                                type="text"
                                inputMode="numeric"
                                className="mt-1 block w-full"
                                autoFocus
                                autoComplete="one-time-code"
                                ref={authCodeInputRef}
                            />
                        </>
                }

                <div className="flex items-center justify-end mt-4">
                    <button type="button" className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer" onClick={toggleRecoveryMode}>
                        {recoveryCodeMode ? 'Use an authentication code' : 'Use a recovery code'}
                    </button>

                    <Button className={`ml-4 ${processing && 'opacity-25'}`}  disabled={processing}>
                        Log in
                    </Button>
                </div>
            </form>

        </AuthenticationCard>
    );
};

export default TwoFactorChallenge;
