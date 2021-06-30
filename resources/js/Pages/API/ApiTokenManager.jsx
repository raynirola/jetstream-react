import React, {useRef, useState} from 'react';
import FormSection from "@/Jetstream/FormSection";
import {useForm, usePage} from "@inertiajs/inertia-react";
import ActionMessage from "@/Jetstream/ActionMessage";
import Button from "@/Jetstream/Button";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import InputError from "@/Jetstream/InputError";
import Checkbox from "@/Jetstream/Checkbox";
import SectionBorder from "@/Jetstream/SectionBorder";
import ActionSection from "@/Jetstream/ActionSection";
import DialogModal from "@/Jetstream/DialogModal";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import ConfirmationModal from "@/Jetstream/ConfirmationModal";

function ApiTokenManager({tokens, availablePermissions, defaultPermissions}) {
    const page = usePage()
    const [displayingToken, setDisplayingToken] = useState(false)
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null)
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null)
    const createApiTokenForm = useForm({name: '', permissions: defaultPermissions})
    const updateApiTokenForm = useForm({permissions: []})
    const deleteApiTokenForm = useForm(null)
    const closeButtonRef = useRef()
    const cancelUpdateApiRef = useRef()
    const cancelDeleteApiButtonRef = useRef()

    const createApiToken = (event) => {
        event.preventDefault()
        createApiTokenForm.post(route('api-tokens.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true)
                createApiTokenForm.reset()
            },
        })
    }

    const manageApiTokenPermissions = (token) => {
        updateApiTokenForm.setData("permissions", token.abilities)
        setManagingPermissionsFor(token)
    }

    const updateApiToken = () => {
        updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setManagingPermissionsFor(null)
        })
    }

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token)
    }

    const deleteApiToken = () => {
        deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setApiTokenBeingDeleted(null)
        })
    }

    const setPermissions = (form, permission, value) => {
        const {data, setData} = form

        if (value && !data.permissions.includes(permission)) {
            setData("permissions", [...data.permissions, permission])
        }

        if (data.permissions.includes(permission)) {
            setData("permissions", data.permissions.filter(previous => previous !== permission))
        }
    }

    return (
        <div>
            <FormSection
                onSubmit={createApiToken}
                title="Create API Token"
                description="API tokens allow third-party services to authenticate with our application on your behalf."
                actions={
                    <>
                        <ActionMessage
                            on={createApiTokenForm.recentlySuccessful}
                            className="mr-3">
                            Created.
                        </ActionMessage>
                        <Button
                            className={createApiTokenForm.processing ? 'opacity-25' : ''}
                            disabled={createApiTokenForm.processing}>
                            Create
                        </Button>
                    </>
                }
            >
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="name" value="Name"/>
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        callback={value => createApiTokenForm.setData("name", value)}
                    />
                    <InputError error={createApiTokenForm.errors.name} className="mt-2"/>
                </div>
                {
                    availablePermissions.length > 0 &&
                    <div className="col-span-6">
                        <Label htmlFor="permissions" value="Permissions"/>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                availablePermissions.map(permission => (
                                    <div key={permission}>
                                        <label className="flex items-center">
                                            <Checkbox checked={createApiTokenForm.data.permissions.includes(permission)}
                                                      callback={value => setPermissions(createApiTokenForm, permission, value)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{permission}</span>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </FormSection>

            {
                tokens.length > 0 &&
                <div>
                    <SectionBorder/>

                    <div className="mt-10 sm:mt-0">
                        <ActionSection
                            title="Manage Api Tokens"
                            description="You may delete any of your existing tokens if they are no longer needed.">
                            <div className="space-y-6">
                                {
                                    tokens.map(token => (
                                        <div className="flex items-center justify-between" key={token.id}>
                                            <div>{token.name}</div>
                                            <div className="flex items-center">
                                                {token.last_used_ago &&
                                                <div className="text-sm text-gray-400">
                                                    Last used {token.last_used_ago}
                                                </div>
                                                }
                                                {
                                                    availablePermissions.length > 0 &&
                                                    <>
                                                        <button
                                                            onClick={() => manageApiTokenPermissions(token)}
                                                            className="cursor-pointer ml-6 text-sm text-gray-400 underline">
                                                            Permissions
                                                        </button>
                                                        <button className="cursor-pointer ml-6 text-sm text-red-500"
                                                                onClick={() => confirmApiTokenDeletion(token)}>
                                                            Delete
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </ActionSection>
                    </div>

                    <DialogModal
                        show={displayingToken}
                        onClose={() => setDisplayingToken(false)}
                        closeable={true}
                        title="API Token"
                        ref={closeButtonRef}
                        content={
                            <>
                                <div>Please copy your new API token. For your security, it won't be shown again.</div>

                                {
                                    page.props.jetstream.flash.token &&
                                    <div className="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500">
                                        {page.props.jetstream.flash.token}
                                    </div>
                                }
                            </>
                        }
                        footer={
                            <SecondaryButton ref={closeButtonRef} onClick={() => setDisplayingToken(false)}>
                                Close
                            </SecondaryButton>
                        }
                    />

                    <DialogModal
                        closeable={true}
                        show={managingPermissionsFor !== null}
                        onClose={() => setManagingPermissionsFor(null)}
                        title="API Token Permissions"
                        ref={cancelUpdateApiRef}
                        content={
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    availablePermissions.map(permission => (
                                        <div key={permission}>
                                            <label className="flex items-center">
                                                <Checkbox
                                                    checked={updateApiTokenForm.data.permissions.includes(permission)}
                                                    callback={value => setPermissions(updateApiTokenForm, permission, value)}
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{permission}</span>
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        footer={
                            <>
                                <SecondaryButton
                                    className="mr-4"
                                    ref={cancelUpdateApiRef}
                                    onClick={() => setManagingPermissionsFor(null)}>
                                    Cancel
                                </SecondaryButton>

                                <Button
                                    onClick={updateApiToken}
                                    className={updateApiTokenForm.processing ? 'opacity-25' : ''}
                                    disabled={updateApiTokenForm.processing}>
                                    Save
                                </Button>
                            </>
                        }
                    />

                    <ConfirmationModal
                        closeable={true}
                        show={apiTokenBeingDeleted !== null}
                        onClose={() => setApiTokenBeingDeleted(null)}
                        title="Delete API Token"
                        ref={cancelDeleteApiButtonRef}
                        content="Are you sure you would like to delete this API token?"
                        footer={
                            <>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={deleteApiToken}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setApiTokenBeingDeleted(null)}
                                    ref={cancelDeleteApiButtonRef}
                                >
                                    Cancel
                                </button>
                            </>
                        }
                    />
                </div>
            }
        </div>
    );
}

export default ApiTokenManager;
