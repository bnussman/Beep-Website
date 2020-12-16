import React, { Component } from 'react';
import { UserContext } from './UserContext';
import { Redirect } from "react-router-dom";
import { config } from './utils/config';
import { Error } from "./utils/errors";

interface props {
}
interface status {
    status: string;
    message: string;
}

interface state {
    first: string;
    last: string;
    username: string;
    phone: string;
    email: string;
    venmo: string;
    status: status | null;
}

export default class EditProfile extends Component<props, state> {
    static contextType = UserContext;

    constructor(props, context) {
        super(props);
        this.state = {
            username: context.user.username,
            first: context.user.first,
            last: context.user.last,
            email: context.user.email,
            phone: context.user.phone,
            venmo: context.user.venmo,
            status: null

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

    handleEdit = (e) => {
        e.preventDefault();
        fetch(config.apiUrl + '/account', {
            method: 'PATCH',
            headers: {
                "Authorization": "Bearer " + this.context.user.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'first': this.state.first,
                'last': this.state.last,
                'email': this.state.email,
                'phone': this.state.phone,
                'venmo': this.state.venmo
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                //make a temporary user object
                let tempUser = this.context.user;
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
            this.setState({ status: data });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //Return the main login page
    render () {
        //if some function tells us to redirect or a user is defined
        //redirect to the home page
        if(!this.context.user) {
            return <Redirect to={{ pathname: "/login"}} />;
        }

        return (
            <div className="lg:container px-4 mx-auto">
                {this.state.status && 
                <div role="alert" className="mb-4" onClick={() => this.setState({ status: null })}>
                        <div className={this.state.status.status === "success" ?
                                "bg-green-500 text-white font-bold rounded-t px-4 py-2"
                                :
                                this.state.status.status === "warning" ?
                                "bg-yellow-500 text-white font-bold rounded-t px-4 py-2"
                                :
                                "bg-red-500 text-white font-bold rounded-t px-4 py-2"
                            }>
                            Edit profile {this.state.status.status}
                        </div>
                        <div className={this.state.status.status === "success" ?
                                "border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700"
                                :
                                this.state.status.status === "warning" ?
                                "border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700"
                                :
                                "border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                            }>
                            <Error error={this.state.status.message}/>
                        </div>
                    </div>
                }
                <form onSubmit={this.handleEdit}>
                    <label className="text-gray-500 font-bold" htmlFor="username">Username</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={this.context.user.username} id="username" type="username" autoComplete="username" placeholder="Username" disabled />
                    <label className="text-gray-500 font-bold" htmlFor="first">First Name</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={this.state.first} id="first" type="text" autoComplete="given-name" placeholder="First Name" onChange={(value) => this.setState({ first: value.target.value })} />
                    <label className="text-gray-500 font-bold" htmlFor="last">Last Name</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={this.state.last} id="last" type="text" autoComplete="family-name" placeholder="Last Name" onChange={(value) => this.setState({ last: value.target.value })} />
                    <label className="text-gray-500 font-bold" htmlFor="email">Email</label>
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={this.state.email} id="email" type="text" autoComplete="email" placeholder="Email Address" onChange={(value) => this.setState({ email: value.target.value })} />
                    <p className="mb-2 text-xs text-gray-500">{this.context.user.isEmailVerified ? this.context.user.isStudent ? "Your email is verified and you are a student" : "Your email is verified" : "Your email is not verified"}</p>
                    <label className="text-gray-500 font-bold" htmlFor="phone">Phone</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={this.state.phone} id="phone" type="text" autoComplete="tel" placeholder="Phone Number" onChange={(value) => this.setState({ phone: value.target.value })} />
                    <label className="text-gray-500 font-bold" htmlFor="venmo">Venmo</label>
                    <input className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" value={this.state.venmo} id="venmo" type="text" autoComplete="username" placeholder="Venmo Username" onChange={(value) => this.setState({ venmo: value.target.value })} />
                    <button type="submit" className="mb-4 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        Update Profile
                    </button>
                </form>
            </div>
        );
    }
}
