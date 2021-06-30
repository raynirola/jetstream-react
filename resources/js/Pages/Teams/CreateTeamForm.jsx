import {useForm, usePage} from "@inertiajs/inertia-react";

import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import Button from "@/Jetstream/Button";
import InputError from "@/Jetstream/InputError";
import FormSection from "@/Jetstream/FormSection";

const CreateTeamForm = () => {
    const {user: authUser} = usePage().props
    const {data, setData, errors, post, processing} = useForm(
        {
            name: ''
        }
    )

    const createTeam = () => post(
        route('teams.store'), {
            errorBag: 'createTeam',
            preserveScroll: true
        }
    )


    const actions =
        <>
            <Button
                onClick={createTeam}
                type="button"
                className={`${processing && 'opacity-25'}`}
                disabled={processing}
            >
                Create
            </Button>
        </>

    return (
        <FormSection
            title={'Team Details'}
            description={'Create a new team to collaborate with others on projects.'}
            actions={actions}
        >
            <div className="col-span-6">
                <jet-label value="Team Owner"/>

                <div className="flex items-center mt-2">
                    <img className="w-12 h-12 rounded-full object-cover" src={authUser.profile_photo_url}
                         alt={authUser.name}/>

                    <div className="ml-4 leading-tight">
                        <div>{authUser.name}</div>
                        <div className="text-gray-700 text-sm">{authUser.email}</div>
                    </div>
                </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="name" value="Team Name"/>
                <Input
                    id="name"
                    callback={value => setData("name", value)}
                    value={data.name} type="text"
                    className="mt-1 block w-full"
                    autoFocus
                />
                <InputError error={errors.name} className="mt-2"/>
            </div>
        </FormSection>
    )
}

export default CreateTeamForm;
