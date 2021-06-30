import React from 'react';
import AppLayout from "@/Layouts/AppLayout";
import SectionBorder from "@/Jetstream/SectionBorder";
import DeleteTeamForm from "@/Pages/Teams/DeleteTeamForm";
import UpdateTeamNameForm from "@/Pages/Teams/UpdateTeamNameForm";
import TeamMemberManager from "@/Pages/Teams/TeamMemberManager";

const Show = ({team, availableRoles, permissions}) => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Team Settings
                </h2>
            }
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <UpdateTeamNameForm team={team} permissions={permissions}/>

                    <TeamMemberManager
                        team={team}
                        availableRoles={availableRoles}
                        userPermissions={permissions}/>

                    {
                        (permissions.canDeleteTeam && !team.personal_team) &&
                        <>
                            <SectionBorder/>
                            <DeleteTeamForm team={team}/>
                        </>
                    }
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
