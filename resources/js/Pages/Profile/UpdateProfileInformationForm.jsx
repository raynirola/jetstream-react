import React, {createRef, useState} from 'react';
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

import Input from "@/Jetstream/Input";
import Label from "@/Jetstream/Label";
import Button from "@/Jetstream/Button";
import InputError from "@/Jetstream/InputError";
import FormSection from "@/Jetstream/FormSection";
import SecondaryButton from "@/Jetstream/SecondaryButton";
import ActionMessage from "@/Jetstream/ActionMessage";

const UpdateProfileInformationForm = ({user}) => {

    const {managesProfilePhotos} = usePage().props.jetstream

    const [photoPreview, setPhotoPreview] = useState(null);

    const selectPhoto = createRef();

    const {data, setData, errors, post, processing, recentlySuccessful} = useForm({
        name: user.name,
        email: user.email,
        photo: null,
        _method: 'PUT'
    })

    const updatePhotoPreview = () => {
        const newPhoto = selectPhoto.current.files[0];

        setData("photo", newPhoto);

        const reader = new FileReader();
        reader.readAsDataURL(newPhoto);

        reader.onloadend = e => setPhotoPreview(e.target.result);
    }

    const updateProfileInformation = () => post(
        route('user-profile-information.update'),
        {
            errorBag: 'updateProfileInformation',
            preserveScroll: true
        }
    )

    const deletePhoto = () => Inertia.delete(
        route('current-user-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => (setPhotoPreview(null)),
        }
    )

    const actions =
        <>
            <ActionMessage on={recentlySuccessful} className="mr-3">
                Saved.
            </ActionMessage>
            <Button onClick={updateProfileInformation} className={`${processing && 'opacity-25'}`}
                    type={'button'} disabled={processing}>
                Save
            </Button>
        </>


    return (
        <FormSection
            title={'Profile Information'}
            description={'Update your account\'s profile information and email address.'}
            actions={actions}
        >
            {
                managesProfilePhotos &&
                <div className="col-span-6 sm:col-span-4">
                    <input
                        type="file"
                        className="hidden"
                        ref={selectPhoto}
                        onChange={updatePhotoPreview}
                    />
                    <Label htmlFor="photo" value="Photo"/>

                    {
                        !photoPreview &&
                        <div className="mt-2 mb-4">
                            <img
                                src={user.profile_photo_url}
                                alt={user.name}
                                className="rounded-full h-20 w-20 object-cover"
                            />
                        </div>
                    }

                    {
                        photoPreview &&
                        <div className="mt-2 mb-4 block rounded-full w-20 h-20"
                             style={
                                 {
                                     backgroundSize: "cover",
                                     backgroundRepeat: "no-repeat",
                                     backgroundPosition: "center",
                                     backgroundImage: `url('${photoPreview}')`
                                 }
                             }
                        />
                    }

                    <SecondaryButton
                        className="mt-2 mr-2"
                        type="button"
                        onClick={() => selectPhoto.current.click()}
                    >
                        Select A New Photo
                    </SecondaryButton>

                    {
                        user.profile_photo_path &&
                        <SecondaryButton
                            type="button"
                            className="mt-2"
                            onClick={deletePhoto}
                        >
                            Remove Photo
                        </SecondaryButton>
                    }

                    <InputError error={errors.photo} className="mt-2"/>
                </div>
            }

            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="name" value="Name"/>
                <Input id="name" type="text" callback={(value) => setData("name", value)} className="mt-1 block w-full"
                       value={data.name} autoComplete="name"/>
                <InputError error={errors.name} className="mt-2"/>
            </div>

            <div className="col-span-6 sm:col-span-4">
                <Label htmlFor="email" value="Email"/>
                <Input id="email" type="email" callback={(value) => setData("email", value)}
                       className="mt-1 block w-full" value={data.email}/>
                <InputError error={errors.email} className="mt-2"/>
            </div>

        </FormSection>
    );
}

export default UpdateProfileInformationForm;
