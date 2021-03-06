import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from "react-router-dom";
import { config } from '../utils/config';
import { Button, TextInput } from '../components/Input';
import { Caption } from '../components/Typography';
import APIResultBanner from '../components/APIResultBanner';

interface Props {
}

interface status {
    status: string;
    message: string;
}

interface State {
    first: string;
    last: string;
    username: string;
    phone: string;
    email: string;
    venmo: string;
    status: status | null;
    photoStatus: status | null;
    photo: any | null;
}

export default class EditProfile extends Component<Props, State> {
    static contextType = UserContext;

    constructor(props: Props, context) {
        super(props);
        this.state = {
            username: context.user.username,
            first: context.user.first,
            last: context.user.last,
            email: context.user.email,
            phone: context.user.phone,
            venmo: context.user.venmo,
            status: null,
            photoStatus: null,
            photo: null
        };
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.state.first !== this.context.user.first) {
            this.setState({ first: this.context.user.first });
        }
        if (this.state.last !== this.context.user.last) {
            this.setState({ last: this.context.user.last });
        }
        if (this.state.email !== this.context.user.email) {
            this.setState({ email: this.context.user.email });
        }
        if (this.state.phone !== this.context.user.phone) {
            this.setState({ phone: this.context.user.phone });
        }
        if (this.state.venmo !== this.context.user.venmo) {
            this.setState({ venmo: this.context.user.venmo });
        }
    }

    async handleEdit(e) {
        e.preventDefault();

        try {
            const response = await fetch(config.apiUrl + '/account', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${this.context.user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first: this.state.first,
                    last: this.state.last,
                    email: this.state.email,
                    phone: this.state.phone,
                    venmo: this.state.venmo
                }),
            });
            const data = await response.json();

            if (data.status === "success") {
                //make a temporary user object
                const tempUser = this.context.user;
                //update values of user
                tempUser.first = this.state.first;
                tempUser.last = this.state.last;
                tempUser.email = this.state.email;
                tempUser.phone = this.state.phone;
                tempUser.venmo = this.state.venmo;
                //if email was changed, make sure the context knows the user is no longer verified
                if (this.state.email !== this.context.user.email) {
                    tempUser.isEmailVerified = false;
                    tempUser.isStudent = false;
                }
                //update the context
                this.context.setUser(tempUser);
                //update localStorage
                localStorage.setItem("user", JSON.stringify(tempUser));
            }
            console.log(this.state.photo);
            if (this.state.photo) this.uploadPhoto();
            this.setState({ status: data });
        }
        catch (error) {
            console.log(error);
        }
    }

    async uploadPhoto() {
        const form = new FormData();
        form.append('photo', this.state.photo);

        
        fetch(config.apiUrl + "/files/upload", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.context.user.token
            },
            body: form
        })
        .then(response => {
            response.json().then(data => {
                if (data.status === "success") {
                    //make a copy of the current user
                    const tempUser = this.context.user;

                    //update the tempUser with the new data
                    tempUser.photoUrl = data.url;

                    //update the context
                    this.context.setUser(tempUser);

                    //put the tempUser back into storage
                    localStorage.setItem("user", JSON.stringify(tempUser));

                    this.setState({ photoStatus: data });
                }
            });
        })
    }

    render() {
        if (!this.context.user) {
            return <Redirect to={{ pathname: "/login" }} />;
        }

        return (
            <div className="lg:container px-4 mx-auto">
                {this.state.status && <APIResultBanner response={this.state.status} setResponse={(val) => this.setState({status: val})}/>}
                {this.state.photoStatus && <APIResultBanner response={this.state.photoStatus} setResponse={(val) => this.setState({photoStatus: val})}/>}

                <form onSubmit={(e) => this.handleEdit(e)}>
                    <TextInput
                        className="mb-4"
                        id="username"
                        label="Username"
                        value={this.context.user.username}
                        disabled
                    />

                    <TextInput
                        className="mb-4"
                        id="first"
                        label="First name"
                        value={this.state.first}
                        placeholder={this.state.first}
                        onChange={(value) => this.setState({ first: value.target.value })}
                    />

                    <TextInput
                        className="mb-4"
                        id="last"
                        label="Last name"
                        value={this.state.last}
                        placeholder={this.state.last}
                        onChange={(value) => this.setState({ last: value.target.value })}
                    />

                    <TextInput
                        id="email"
                        label="Email"
                        type="email"
                        value={this.state.email}
                        placeholder={this.state.email}
                        onChange={(value) => this.setState({ email: value.target.value })}
                    />
                    <Caption className="mb-2">
                        {
                            this.context.user.isEmailVerified
                            ? this.context.user.isStudent
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
                        value={this.state.phone}
                        placeholder={this.state.phone}
                        onChange={(value) => this.setState({ phone: value.target.value })}
                    />

                    <TextInput
                        className="mb-4"
                        id="venmo"
                        label="Venmo username"
                        value={this.state.venmo}
                        placeholder={this.state.venmo}
                        onChange={(value) => this.setState({ venmo: value.target.value })}
                    />
                    
                    {this.state.photo && <img src={URL.createObjectURL(this.state.photo)} className="rounded-full h-24 w-24" alt="new"/>}

                    <div className="flex flex-row mb-4">
                        <svg fill="#00000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        <span className="ml-2">New Profile Photo</span>
                        <input
                            className="cursor-pointer absolute block opacity-0 pin-r pin-t"
                            type="file"
                            onChange={(e) => this.setState({ photo: e.target.files[0] })}
                        />
                    </div>


                    <Button raised>Update profile</Button>
                </form>
            </div>
        );
    }
}
