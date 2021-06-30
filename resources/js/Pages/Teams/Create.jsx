import AppLayout from "@/Layouts/AppLayout";
import CreateTeamForm from "@/Pages/Teams/CreateTeamForm";

const Create = () => {
    const header =
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create Team
        </h2>

    return (
        <AppLayout header={header}>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateTeamForm/>
            </div>
        </AppLayout>
    );

};

export default Create;
