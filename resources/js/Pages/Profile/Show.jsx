import {usePage} from "@inertiajs/inertia-react";

import AppLayout from "@/Layouts/AppLayout";
import UpdateProfileInformationForm from "@/Pages/Profile/UpdateProfileInformationForm";
import SectionBorder from "@/Jetstream/SectionBorder";
import UpdatePasswordForm from "@/Pages/Profile/UpdatePasswordForm";
import LogoutOtherBrowserSessionsForm from "@/Pages/Profile/LogoutOtherBrowserSessionsForm";
import DeleteUserForm from "@/Pages/Profile/DeleteUserForm";
import TwoFactorAuthenticationForm from "@/Pages/Profile/TwoFactorAuthenticationForm";

const Show = () => {

    const {sessions, user: authUser} = usePage().props
    const {
        canUpdateProfileInformation,
        canUpdatePassword,
        canManageTwoFactorAuthentication,
        hasAccountDeletionFeatures
    } = usePage().props.jetstream

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                {
                    canUpdateProfileInformation &&
                    <>
                        <UpdateProfileInformationForm user={authUser}/>
                        <SectionBorder/>
                    </>
                }

                {
                    canUpdatePassword &&
                    <>
                        <UpdatePasswordForm user={authUser} className="mt-10 sm:mt-0"/>
                        <SectionBorder/>
                    </>
                }

                {
                    canManageTwoFactorAuthentication &&
                    <div className="mt-10 sm:mt-0">
                        <TwoFactorAuthenticationForm/>
                        <SectionBorder/>
                    </div>
                }

                <div className="mt-10 sm:mt-0">
                    <LogoutOtherBrowserSessionsForm sessions={sessions} className="mt-10 sm:mt-0"/>
                </div>

                {
                    hasAccountDeletionFeatures &&
                    <div className="mt-10 sm:mt-0">
                        <SectionBorder/>
                        <DeleteUserForm/>
                    </div>
                }
            </div>
        </AppLayout>
    );
};

export default Show;
