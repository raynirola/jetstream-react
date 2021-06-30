import React, {Fragment, useState} from 'react';
import SectionBorder from "@/Jetstream/SectionBorder";
import FormSection from "@/Jetstream/FormSection";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import {useForm, usePage} from "@inertiajs/inertia-react";
import InputError from "@/Jetstream/InputError";
import ActionMessage from "@/Jetstream/ActionMessage";
import Button from "@/Jetstream/Button";
import ActionSection from "@/Jetstream/ActionSection";
import {Inertia} from "@inertiajs/inertia";
import DialogModal from "@/Jetstream/DialogModal";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import ConfirmationModal from "@/Jetstream/ConfirmationModal";

const TeamMemberManager = ({team, availableRoles, userPermissions}) => {
    const page = usePage()
    const [managingRoleFor, setManagingRoleFor] = useState(null)
    const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false)
    const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false)
    const [confirmingRemovingMember, setConfirmingRemovingMember] = useState(false)
    const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState(null)

    const addTeamMemberForm = useForm({email: '', role: null})
    const updateRoleForm = useForm({role: null})
    const leaveTeamForm = useForm({})
    const removeTeamMemberForm = useForm({})

    const addTeamMember = (event) => {
        event.preventDefault()
        addTeamMemberForm.post(route('team-members.store', team), {
            errorBag: 'addTeamMember',
            preserveScroll: true,
            onSuccess: () => addTeamMemberForm.reset(),
        });
    }

    const cancelTeamInvitation = (invitation) => {
        Inertia.delete(route('team-invitations.destroy', invitation), {
            preserveScroll: true
        });
    };

    function displayableRole(role) {
        return availableRoles.find(r => r.key === role).name
    }

    function manageRole(teamMember) {
        setManagingRoleFor(teamMember)
        updateRoleForm.setData("role", teamMember.membership.role)
        setCurrentlyManagingRole(true)
    }

    function confirmTeamMemberRemoval(teamMember) {
        setConfirmingRemovingMember(true)
        setTeamMemberBeingRemoved(teamMember)
    }

    function confirmLeavingTeam() {
        setConfirmingLeavingTeam(true)
    }

    function removeTeamMember() {
        removeTeamMemberForm.delete(route('team-members.destroy', [team, teamMemberBeingRemoved]), {
            errorBag: 'removeTeamMember',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setTeamMemberBeingRemoved(null)
                setConfirmingRemovingMember(false)
            },
        })
    }

    const leaveTeam = () => {
        leaveTeamForm.delete(route('team-members.destroy', [team, page.props.user]))
    };

    function updateRole() {
        updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
            preserveScroll: true,
            onSuccess: () => setCurrentlyManagingRole(false),
        })
    }

    return (
        <>
            {
                userPermissions.canAddTeamMembers &&
                <div>
                    <SectionBorder/>
                    <FormSection
                        className="mt-10 sm:mt-0"
                        description={"Add a new team member to your team, allowing them to collaborate with you."}
                        title={" Add Team Member"}
                        onSubmit={addTeamMember}
                        actions={
                            <>
                                <ActionMessage on={addTeamMemberForm.recentlySuccessful} className="mr-3">
                                    Added.
                                </ActionMessage>

                                <Button type="button" onClick={addTeamMember}
                                        className={addTeamMemberForm.processing ? 'opacity-25' : ''}
                                        disabled={addTeamMemberForm.processing}>
                                    Save
                                </Button>
                            </>
                        }>

                        <div className="col-span-6">
                            <div className="max-w-xl text-sm text-gray-600">
                                Please provide the email address of the person you would like to add to this team.
                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <Label htmlFor="email" value="Email"/>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                callback={value => {
                                    console.log(value)
                                    addTeamMemberForm.setData("email", value)
                                }}/>
                            <InputError error={addTeamMemberForm.errors.email} class="mt-2"/>
                        </div>

                        <div className="col-span-6 lg:col-span-4" v-if="availableRoles.length > 0">
                            <Label htmlFor="roles" value="Role"/>
                            <InputError error={addTeamMemberForm.errors.role} className="mt-2"/>
                            {
                                availableRoles.map((role, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none ${index > 0 && 'border-t border-gray-200 rounded-t-none'} ${index !== Object.keys(availableRoles).length - 1 && 'rounded-b-none'}`}
                                        onClick={() => addTeamMemberForm.setData("role", role.key)}>
                                        <div
                                            className={addTeamMemberForm.role && addTeamMemberForm.data.role !== role.key ? 'opacity-50' : ''}>
                                            <div className="flex items-center">
                                                <div
                                                    className={`text-sm text-gray-600 ${addTeamMemberForm.data.role === role.key && 'font-semibold'}`}>
                                                    {role.name}
                                                </div>

                                                {addTeamMemberForm.data.role === role.key &&
                                                <svg className="ml-2 h-5 w-5 text-green-400" fill="none"
                                                     strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                }
                                            </div>

                                            <div className="mt-2 text-xs text-gray-600">
                                                {role.description}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </FormSection>
                </div>
            }

            {
                (team.team_invitations.length > 0 && userPermissions.canAddTeamMembers) &&
                <div>
                    <SectionBorder/>
                    <ActionSection className="mt-10 sm:mt-0"
                                   title={"Pending Team Invitations"}
                                   description={"These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation."}>
                        <div className="space-y-6">
                            {
                                team.team_invitations.map(invitation => (
                                    <div key={invitation.id} className="flex items-center justify-between">
                                        <div className="text-gray-600">{invitation.email}</div>

                                        <div className="flex items-center">
                                            {userPermissions.canRemoveTeamMembers &&
                                            <button
                                                className="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"
                                                onClick={() => cancelTeamInvitation(invitation)}>
                                                Cancel
                                            </button>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ActionSection>
                </div>
            }

            {
                team.users.length > 0 &&
                <div>
                    <SectionBorder/>
                    <ActionSection
                        className="mt-10 sm:mt-0"
                        title={"Team Members"}
                        description={"All of the people that are part of this team."}>
                        <div className="space-y-6">
                            {
                                team.users.map(user => (
                                    <Fragment key={user.id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    className="w-8 h-8 rounded-full" src={user.profile_photo_url}
                                                    alt={user.name}/>
                                                <div className="ml-4">{user.name}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {
                                                (userPermissions.canAddTeamMembers && availableRoles.length)
                                                    ?
                                                    <button
                                                        className="ml-2 text-sm text-gray-400 underline"
                                                        onClick={() => manageRole(user)}>
                                                        {displayableRole(user.membership.role)}
                                                    </button>
                                                    : availableRoles.length &&
                                                    <div className="ml-2 text-sm text-gray-400">
                                                        {displayableRole(user.membership.role)}
                                                    </div>
                                            }


                                            {
                                                page.props.user.id === user.id &&
                                                <button className="cursor-pointer ml-6 text-sm text-red-500"
                                                        onClick={confirmLeavingTeam}>
                                                    Leave
                                                </button>
                                            }

                                            {
                                                userPermissions.canRemoveTeamMembers &&
                                                <button className="cursor-pointer ml-6 text-sm text-red-500"
                                                        onClick={() => confirmTeamMemberRemoval(user)}>
                                                    Remove
                                                </button>
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </ActionSection>
                </div>
            }

            <DialogModal
                show={currentlyManagingRole}
                closeable={true}
                onClose={() => setCurrentlyManagingRole(false)}
                title={"Manage Role"}
                content={
                    managingRoleFor &&
                    <div>
                        <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                            {availableRoles.map((role, index) => (
                                <button
                                    key={role.key}
                                    type="button"
                                    className={`relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none ${index > 0 && 'border-t border-gray-200 rounded-t-none'} ${index !== Object.keys(availableRoles).length - 1 && 'rounded-b-none'}`}
                                    onClick={() => updateRoleForm.setData("role", role.key)}
                                >
                                    <div
                                        className={updateRoleForm.role && updateRoleForm.data.role !== role.key ? 'opacity-50' : ''}>
                                        <div className="flex items-center">
                                            <div
                                                className={`text-sm text-gray-600 ${updateRoleForm.data.role === role.key && 'font-semibold'}`}>
                                                {role.name}
                                            </div>
                                            {updateRoleForm.data.role === role.key &&
                                            <svg className="ml-2 h-5 w-5 text-green-400" fill="none"
                                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                 stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            }
                                        </div>
                                        <div className="mt-2 text-xs text-gray-600">
                                            {role.description}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                }
                footer={
                    <>
                        <SecondaryButton onClick={() => setCurrentlyManagingRole(false)}>
                            Cancel
                        </SecondaryButton>

                        <Button
                            type="button"
                            onClick={updateRole}
                            className={`ml-2 ${updateRoleForm.processing ? 'opacity-25' : ''}`}
                            disabled={updateRoleForm.processing}>
                            Save
                        </Button>
                    </>
                }
            />

            <ConfirmationModal
                show={confirmingLeavingTeam}
                title="Leave Team"
                closeable={true}
                onClose={() => setConfirmingLeavingTeam(false)}
                content="Are you sure you would like to leave this team? This action cannot be undone."
                footer={
                    <>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={leaveTeam}>
                            Leave
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setConfirmingLeavingTeam(false)}
                        >
                            Cancel
                        </button>
                    </>
                }
            />

            <ConfirmationModal
                show={confirmingRemovingMember}
                title="Remove Team Member"
                closeable={true}
                onClose={() => setConfirmingRemovingMember(false)}
                content="Are you sure you would like to remove this person from the team? This action cannot be undone."
                footer={
                    <>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={removeTeamMember}>
                            Leave
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setConfirmingRemovingMember(false)}
                        >
                            Cancel
                        </button>
                    </>
                }
            />
        </>
    );
}

export default TeamMemberManager;
