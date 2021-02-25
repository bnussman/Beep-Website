import React, { Component, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from "react-router-dom";
import { config } from '../utils/config';
import { Button, TextInput } from '../components/Input';
import { Caption } from '../components/Typography';
import APIResultBanner from '../components/APIResultBanner';
import {gql, useMutation} from '@apollo/client';
import {EditAccountMutation} from '../generated/graphql';

interface Props {
}

const EditAccount = gql`
    mutation EditAccount($first: String, $last: String, $email: String, $phone: String, $venmo: String) {
        editAccount (
            input: {
                first : $first,
                last: $last,
                email: $email,
                phone: $phone,
                venmo: $venmo
            }
        ) {
        id
        name
        }
    }
`;

function EditProfile(props: Props) {

    const { user, setUser } = useContext(UserContext);
    const [edit, { data, loading, error }] = useMutation<EditAccountMutation>(EditAccount);

    //const [username] = useState<string | undefined>(user?.user.username);
    const [first, setFirst] = useState<string | undefined>(user?.user.first);
    const [last, setLast] = useState<string | undefined>(user?.user.last);
    const [email, setEmail] = useState<string | undefined>(user?.user.email);
    const [phone, setPhone] = useState<string | undefined>(user?.user.phone);
    const [venmo, setVenmo] = useState<string | undefined>(user?.user.venmo);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (first !== user?.user.first) setFirst(user?.user.first);
        if (last !== user?.user.last) setLast(user?.user.last);
        if (email !== user?.user.email) setEmail(user?.user.email);
        if (phone !== user?.user.first) setPhone(user?.user.phone);
        if (venmo !== user?.user.venmo) setVenmo(user?.user.venmo);
    }, [user]);

    async function handleEdit(e) {
        e.preventDefault();

        try {
            const result = await edit({ variables: {
                first: first,
                last: last,
                email: email,
                phone: phone,
                venmo: venmo
            }});

            if (result) {
                //make a temporary user object
                const tempUser = user;
                //update values of user
                tempUser.user.first = first;
                tempUser.user.last = last;
                tempUser.user.email = email;
                tempUser.user.phone = phone;
                tempUser.user.venmo = venmo;

                //if email was changed, make sure the context knows the user is no longer verified
                if (email !== user.user.email) {
                    tempUser.user.isEmailVerified = false;
                    tempUser.user.isStudent = false;
                }
                //update the context
                setUser(tempUser);
                //update localStorage
                localStorage.setItem("user", JSON.stringify(tempUser));
            }
            //if (this.state.photo) this.uploadPhoto();
        }
        catch (error) {
            console.log(error);
        }
    }

    async function uploadPhoto() {
        const form = new FormData();
        form.append('photo', this.state.photo);

        
        fetch(config.apiUrl + "/files/upload", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.context.user.tokens.token
            },
            body: form
        })
        .then(response => {
            response.json().then(data => {
                if (data.status === "success") {

                    const tempUser = this.context.user;

                    //update the tempUser with the new data
                    tempUser['user']['photoUrl'] = data.url;

                    //update the context
                    this.context.setUser(tempUser);

                    //put the tempUser back into storage
                    localStorage.setItem("user", JSON.stringify(tempUser));

                    this.setState({ photoStatus: data });
                }
            });
        })
    }

        if (!user) {
            return <Redirect to={{ pathname: "/login" }} />;
        }

        return (
            <div className="lg:container px-4 mx-auto">
                {error && error.message}
                {loading && <p>Loading</p>}

                <form onSubmit={(e) => handleEdit(e)}>
                    <TextInput
                        className="mb-4"
                        id="username"
                        label="Username"
                        value={user.user.username}
                        disabled
                    />

                    <TextInput
                        className="mb-4"
                        id="first"
                        label="First name"
                        value={first}
                        placeholder={first}
                        onChange={(value) => setFirst(value.target.value)}
                    />

                    <TextInput
                        className="mb-4"
                        id="last"
                        label="Last name"
                        value={last}
                        placeholder={last}
                        onChange={(value) => setLast(value.target.value)}
                    />

                    <TextInput
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        placeholder={email}
                        onChange={(value) => setEmail(value.target.value)}
                    />
                    <Caption className="mb-2">
                        {
                            user.user.isEmailVerified
                            ? user.user.isStudent
                                ? "Your email is verified and you are a student"
                                : "Your email is verified"
                            : "Your email is not verified"
                        }
                    </Caption>

                    <TextInput
                        className="mb-4"
                        id="phone"
                        label="Phone"
                        type="tel"
                        value={phone}
                        placeholder={phone}
                        onChange={(value) => setPhone(value.target.value)}
                    />

                    <TextInput
                        className="mb-4"
                        id="venmo"
                        label="Venmo username"
                        value={venmo}
                        placeholder={venmo}
                        onChange={(value) => setVenmo(value.target.value)}
                    />
                    
                    {photo && <img src={URL.createObjectURL(photo)} className="rounded-full h-24 w-24" alt="new"/>}

                    <div className="flex flex-row mb-4">
                        <svg fill="#00000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        <span className="ml-2">New Profile Photo</span>
                        <input
                            className="cursor-pointer absolute block opacity-0 pin-r pin-t"
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>


                    <Button raised>Update profile</Button>
                </form>
            </div>
        );
}

export default EditProfile;
