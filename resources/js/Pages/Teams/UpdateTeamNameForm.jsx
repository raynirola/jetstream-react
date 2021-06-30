import React from 'react';
import FormSection from "@/Jetstream/FormSection";
import Label from "@/Jetstream/Label";
import Input from "@/Jetstream/Input";
import InputError from "@/Jetstream/InputError";
import {useForm} from "@inertiajs/inertia-react";
import ActionMessage from "@/Jetstream/ActionMessage";
import Button from "@/Jetstream/Button";

const UpdateTeamNameForm = ({team, permissions}) => {
    const {data, setData, put, errors, recentlySuccessful, processing} = useForm({name: team.name})

    const updateTeamName = (event) => {
        event.preventDefault();
        put(route('teams.update', team), {
            errorBag: 'updateTeamName',
            preserveScroll: true
        });
    }

    return (
        <FormSection
            description={"The team's name and owner information."}
            title={"Team Name"}
            onSubmit={updateTeamName}
            actions={
                permissions.canUpdateTeam &&
                <>
                    <ActionMessage on={recentlySuccessful} className="mr-3">
                        Saved.
                    </ActionMessage>

                    <Button type="submit" className={processing ? 'opacity-25' : ''} disabled={processing}>
                        Save
                    </Button>
                </>
            }
        >
            <div className="col-span-6">
                <Label value="Team Owner"/>

                <div className="flex items-center mt-2">
                    <img className="w-12 h-12 rounded-full object-cover"
                         src={team.owner.profile_photo_url}
                         alt={team.owner.name}/>

                    <div className="ml-4 leading-tight">
                        <p className="font-medium">{team.owner.name}</p>
                        <div className="text-gray-700 text-sm">{team.owner.email}</div>
                    </div>
                </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="name" value="Team Name"/>

                <Input id="name" type="text" className="mt-1 block w-full"
                       callback={value => setData("name", value)}
                       value={data.name}
                       disabled={!permissions.canUpdateTeam}/>

                <InputError error={errors.name} className="mt-2"/>
            </div>

        </FormSection>
    )
        ;
};

export default UpdateTeamNameForm;
