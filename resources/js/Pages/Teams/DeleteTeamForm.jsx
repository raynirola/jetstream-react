import React, {useRef, useState} from 'react';
import ActionSection from "@/Jetstream/ActionSection";
import DangerButton from "@/Jetstream/DangerButton";
import ConfirmationModal from "@/Jetstream/ConfirmationModal";
import {Inertia} from "@inertiajs/inertia";

const DeleteTeamForm = ({team}) => {
    const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false)
    const cancelButtonRef =  useRef()
    const confirmTeamDeletion = () => {
        setConfirmingTeamDeletion(true)
    }

    const deleteTeam = () => {
        Inertia.delete(route('teams.destroy', team), {}, {
            errorBag: 'deleteTeam'
        });
    }

    const closeModal = () => {
        setConfirmingTeamDeletion(false)
    }

    return (
        <ActionSection
            title={"Delete Team"}
            description={" Permanently delete this team."}
        >
            <div className="max-w-xl text-sm text-gray-600">
                Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this
                team, please download any data or information regarding this team that you wish to retain.
            </div>

            <div className="mt-5">
                <DangerButton onClick={confirmTeamDeletion}>
                    Delete Team
                </DangerButton>
            </div>

            <ConfirmationModal
                show={confirmingTeamDeletion}
                closeable={true}
                onClose={closeModal}
                ref={cancelButtonRef}
                title={"Delete Team"}
                content={"Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted."}
                footer={
                <>
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={deleteTeam}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={closeModal}
                        ref={cancelButtonRef}
                    >
                        Cancel
                    </button>
                </>
            }>


            </ConfirmationModal>
        </ActionSection>
    );
};

export default DeleteTeamForm;
